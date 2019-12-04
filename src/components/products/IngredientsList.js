import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import $ from 'jquery'
import Inputmask from 'inputmask'
import validate from 'validate.js'

import Modal from '../Modal'

import { ProductActions } from '../../store/ProductState'

const { addIngrediente, removeIngrediente } = ProductActions

const validation = {
  ingrediente: {
    presence: {
      allowEmpty: false,
      message: 'Insira um ingrediente'
    }
  },
  medida: {
    inclusion: {
      within: ['kg', 'l', 'un', 'm³'],
      message: 'Especifique a unidade de medida'
    }
  },
  preco: {
    numericality: {
      greaterThan: 0,
      message: 'Insira um preço'
    }
  },
  qtd: {
    numericality: {
      greaterThan: 0,
      message: 'Insira uma quantidade'
    }
  }
}

const IngredientsList = ({ product }) => {
  const modalId = `modal-add-ingredient-${product.id.replace(/\s/g, '')}`
  const initialItem = {
    ingrediente: '',
    medida: 'unid. medida',
    preco: '',
    qtd: 0
  }
  const [item, setItem] = useState({ ...initialItem })
  const [err, setErr] = useState('')

  const precoRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    $(`#${modalId}`).on('hide.bs.modal', () => {
      setItem({ ...initialItem })
      setErr('')
    })

    return () => $(`#${modalId}`).off('hide.bs.modal')
  }, [])

  useEffect(() => {
    if (precoRef.current) {
      Inputmask({
        numericInput: true,
        mask: '999 999 999,99',
        placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false
      }).mask(precoRef.current)
    }
  }, [precoRef.current])

  const addItem = name => e => setItem({ ...item, [name]: e.target.value })

  const saveIngrediente = () => {
    const val = {
      ...item,
      preco: Number(item.preco.replace(/\s/g, '').replace(',', '.')),
      qtd: Number(item.qtd)
    }
    const teste = validate(val, validation, { format: 'detailed' })

    if (teste) {
      return setErr(teste[0].options.message)
    }

    dispatch(addIngrediente(product.id, val))

    $(`#${modalId}`).modal('hide')
  }

  return (
    <Fragment>
      <div className='mx-n4 border mt-3 py-1'>
        <h6 className='m-0 px-4 pt-2'>
          Crie sua lista de ingredientes para uma fornada de {product.name}
        </h6>
        <div className='row px-4 py-2 align-items-end'>
          <h6 className='col-3 p-1 m-0 text-center'>ingrediente</h6>
          <h6 className='col-2 p-1 m-0 text-center'>unid. medida</h6>
          <h6 className='col-2 p-1 m-0 text-center'>preço</h6>
          <h6 className='col-2 p-1 m-0 text-center'>quantidade</h6>
          <h6 className='col-3 p-1 m-0 text-center'>custo</h6>
        </div>
        {Object.keys(product.ingredientes).map((k, index) => (
          <Ingrediente
            key={k}
            productId={product.id}
            ingredient={product.ingredientes[k]}
          />
        ))}
        <button
          className='btn rounded-0 px-4 btn-success ml-4 my-4'
          data-toggle='modal'
          data-target={`#${modalId}`}
        >
          <i className='fas fa-plus mr-2' />
          adicionar ingrediente
        </button>
      </div>
      <Modal
        id={modalId}
        errorMessage={err}
        onSave={saveIngrediente}
        title='adicionar ingrediente'
      >
        <input
          type='text'
          className='form-control'
          placeholder='ingrediente'
          onChange={addItem('ingrediente')}
          value={item.ingrediente}
        />
        <select
          className='form-control mt-2'
          placeholder='unid. medida'
          value={item.medida}
          onChange={addItem('medida')}
        >
          <option>unid. medida</option>
          <option>kg</option>
          <option>l</option>
          <option>m³</option>
          <option>un</option>
        </select>
        <input
          ref={precoRef}
          type='text'
          className='form-control mt-2'
          placeholder={`preço por unid. medida`}
          onChange={addItem('preco')}
          value={item.preco}
        />
        <input
          type='number'
          className='form-control mt-2'
          placeholder='quantidade'
          onChange={addItem('qtd')}
          value={item.qtd}
        />
      </Modal>
    </Fragment>
  )
}

const Ingrediente = ({ productId, ingredient }) => {
  const dispatch = useDispatch()

  const total = () => ingredient.preco * ingredient.quantidade

  const handlerDelete = () => {
    dispatch(removeIngrediente(productId, ingredient.id))
  }

  return (
    <div className='row border px-4 py-1 flex-nowrap align-items-center'>
      <h6 className='col-3 p-1 m-0 text-center border mr-1'>
        {ingredient.name}
      </h6>
      <h6 className='col-2 p-1 m-0 text-center border mr-1'>
        {ingredient.medida}
      </h6>
      <h6 className='col-2 p-1 m-0 text-center border mr-1'>
        {ingredient.preco}
      </h6>
      <h6 className='col-2 p-1 m-0 text-center border mr-1'>
        {ingredient.quantidade}
      </h6>
      <div className='col-3 p-1 d-flex align-items-center pr-4'>
        <h6 className='m-0'>R$ {total()}</h6>
        <button className='btn ml-auto p-0' onClick={handlerDelete}>
          <i className='fas fa-trash' />
        </button>
      </div>
    </div>
  )
}

export default IngredientsList

import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import $ from 'jquery'
import Inputmask from 'inputmask'
import validate from 'validate.js'

import Modal from '../Modal'

import { ProductActions } from '../../store/ProductState'

const { addInsumo, removeInsumo } = ProductActions

const validation = {
  insumo: {
    presence: {
      allowEmpty: false,
      message: 'Insira um insumo'
    }
  },
  medida: {
    inclusion: {
      within: ['kg', 'l', 'kwh', 'un', 'm³'],
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

const InsumosList = ({ product }) => {
  const modalId = `modal-add-insumo-${product.id.replace(/\s/g, '')}`
  const initialItem = { insumo: '', medida: 'unid. medida', preco: '', qtd: 0 }
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

  const saveInsumo = () => {
    const val = {
      ...item,
      preco: Number(item.preco.replace(/\s/g, '').replace(',', '.')),
      qtd: Number(item.qtd)
    }
    const teste = validate(val, validation, { format: 'detailed' })

    if (teste) {
      return setErr(teste[0].options.message)
    }

    dispatch(addInsumo(product.id, val))

    $(`#${modalId}`).modal('hide')
  }

  return (
    <Fragment>
      <div className='mx-n4 border py-1'>
        <h6 className='m-0 px-4 pt-2'>
          crie sua lista de insumos para uma fornada com {product.fornada}{' '}
          unidade(s) de {product.name}
        </h6>
        <div className='row px-4 py-2 align-items-end'>
          <h6 className='col-3 p-1 m-0 text-center'>ingrediente</h6>
          <h6 className='col-2 p-1 m-0 text-center'>unid. medida</h6>
          <h6 className='col-2 p-1 m-0 text-center'>preço</h6>
          <h6 className='col-2 p-1 m-0 text-center'>quantidade</h6>
          <h6 className='col-3 p-1 m-0 text-center'>custo</h6>
        </div>
        {Object.keys(product.insumos).map((k, index) => (
          <Insumos key={k} productId={product.id} insumo={product.insumos[k]} />
        ))}
        <button
          className='btn rounded-0 px-4 btn-success ml-4 my-4'
          data-toggle='modal'
          data-target={`#${modalId}`}
        >
          <i className='fas fa-plus mr-2' />
          adicionar insumo
        </button>
      </div>
      <Modal
        id={modalId}
        errorMessage={err}
        onSave={saveInsumo}
        title='adicionar insumo'
      >
        <input
          type='text'
          className='form-control'
          placeholder='insumo'
          onChange={addItem('insumo')}
          value={item.insumo}
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
          <option>kwh</option>
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

const Insumos = ({ productId, insumo }) => {
  const dispatch = useDispatch()

  const total = () => insumo.preco * insumo.quantidade

  const handlerDelete = () => {
    dispatch(removeInsumo(productId, insumo.id))
  }

  return (
    <div className='row border px-4 py-1 flex-nowrap align-items-center'>
      <h6 className='col-3 p-1 m-0 text-center border mr-1'>{insumo.name}</h6>
      <h6 className='col-2 p-1 m-0 text-center border mr-1'>{insumo.medida}</h6>
      <h6 className='col-2 p-1 m-0 text-center border mr-1'>{insumo.preco}</h6>
      <h6 className='col-2 p-1 m-0 text-center border mr-1'>
        {insumo.quantidade}
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

export default InsumosList

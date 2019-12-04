import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery'
import Inputmask from 'inputmask'
import validate from 'validate.js'

import Modal from './Modal'
import { CustoFixoAction } from '../store/CustoFixoState'

const { getFromLocal, saveItem, removeItem, editItem } = CustoFixoAction

const validacao = {
  item: {
    presence: {
      allowEmpty: false,
      message: 'É necessário acrescentar um item.'
    }
  },
  value: {
    numericality: {
      greaterThan: 0.0,
      message: 'Insira um valor de custo'
    }
  }
}

const CustoFixo = () => {
  const [newItem, setNewItem] = useState({ item: '', value: '' })
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)

  const list = useSelector(({ custofixo }) => custofixo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFromLocal())

    Inputmask({
      numericInput: true,
      mask: '999 999 999,99',
      placeholder: ' ',
      showMaskOnHover: false,
      showMaskOnFocus: false
    }).mask($('#new-item-value'))

    $('#modal-add-item').on('hidden.bs.modal', () => {
      setError('')
      setNewItem({ item: '', value: '' })
    })

    return () => $('#modal-add-item').off('hidden.bs.modal')
  }, [])

  useEffect(() => {
    setTotal(sum())
  }, [list])

  const sum = () => {
    let val = 0
    Object.keys(list).map(k => (val += Number(list[k].value)))

    return val
  }

  const changeNewItem = name => e =>
    setNewItem({ ...newItem, [name]: e.target.value })

  const saveNewItem = () => {
    const val = {
      ...newItem,
      value: Number(newItem.value.replace(/\s/g, '').replace(',', '.'))
    }
    const teste = validate(val, validacao, { format: 'detailed' })

    if (teste) {
      return setError(teste[0].options.message)
    }

    dispatch(saveItem(val))

    setNewItem({ item: '', value: '' })
    $('#modal-add-item').modal('hide')
  }

  return (
    <Fragment>
      <div className='w-100 d-flex flex-column'>
        <h6 className='text-uppercase py-2'>crie sua lista de custos fixos</h6>
        <div className='mx-n4 border'>
          <div className='row px-2'>
            <TitleItem colClass='col-6 col-sm-7' label='item' />
            <TitleItem colClass='col-3' label='valor' />
            <TitleItem
              colClass='col-3 col-sm-2'
              textClass='text-center'
              label='excluir'
            />
          </div>
          {Object.keys(list).map(k => (
            <Item key={k} data={list[k]} />
          ))}
        </div>
        <div className='d-flex w-100 mx-n4 p-2 align-items-center flex-wrap flex-md-nowrap'>
          <button
            className='btn rounded-0 px-5 btn-success'
            data-toggle='modal'
            data-target='#modal-add-item'
          >
            <i className='fas fa-plus mr-2' />
            adicionar item
          </button>
          <div className='d-flex align-items-baseline ml-0 ml-sm-2 mt-2 mt-sm-0'>
            <h5 className='mr-2'>total de custos fixos:</h5>
            <h3>R$ {total}</h3>
          </div>
        </div>
      </div>

      <Modal
        id='modal-add-item'
        title='Novo Custo Fixo'
        onSave={saveNewItem}
        errorMessage={error}
      >
        <input
          type='text'
          className='form-control'
          placeholder='item'
          onChange={changeNewItem('item')}
          value={newItem.item}
        />
        <input
          id='new-item-value'
          type='text'
          className='form-control mt-2'
          placeholder='valor'
          onChange={changeNewItem('value')}
          value={newItem.value}
        />
      </Modal>
    </Fragment>
  )
}

const TitleItem = ({ colClass, label, textClass }) => (
  <div className={`py-2 ${colClass}`}>
    <h6 className={`m-0 text-uppercase ${textClass}`}>{label}</h6>
  </div>
)

const Item = ({ data: { item, value, id } }) => {
  const dispatch = useDispatch()

  const modalId = `modal-edit-item-${id.replace(/\s/g, '-')}`

  const [newItem, setNewItem] = useState({ item, value })
  const [err, setErr] = useState('')

  const changeNewItem = name => e =>
    setNewItem({ ...newItem, [name]: e.target.value })

  useEffect(() => {
    Inputmask({
      numericInput: true,
      mask: '999 999 999,99',
      placeholder: ' ',
      showMaskOnHover: false,
      showMaskOnFocus: false
    }).mask($(`#new-item-value-${id.replace(/\s/g, '-')}`))

    $(`#${modalId}`).on('hidden.bs.modal', () => {
      setErr('')
      setNewItem({ item, value })
    })

    return () => $(`#${modalId}`).off('hidden.bs.modal')
  }, [])

  const editNewItem = () => {
    const val = {
      ...newItem,
      value: Number(
        String(newItem.value)
          .replace(/\s/g, '')
          .replace(',', '.')
      )
    }
    const teste = validate(val, validacao, { format: 'detailed' })

    if (teste) {
      return setErr(teste[0].options.message)
    }

    if (val.item !== item || val.value !== value) {
      dispatch(editItem(id, val))
    }

    setNewItem({ item, value })
    $(`#${modalId}`).modal('hide')
  }

  const deleteItem = () => {
    dispatch(removeItem(id))
  }

  return (
    <Fragment>
      <div className='row px-2 align-items-center border'>
        <div className='col-6 col-sm-7'>
          <h6 className='m-0 text-uppercase'>{item}</h6>
        </div>
        <div className='col-3 border'>{value}</div>
        <div className='col-3 col-sm-2 d-flex justify-content-center'>
          <button
            className='btn'
            data-toggle='modal'
            data-target={`#${modalId}`}
          >
            <i className='fas fa-pencil-alt' />
          </button>
          <button className='btn' onClick={deleteItem}>
            <i className='fas fa-trash' />
          </button>
        </div>
      </div>
      <Modal
        id={modalId}
        title='Custo Fixo'
        onSave={editNewItem}
        errorMessage={err}
      >
        <input
          type='text'
          className='form-control'
          placeholder='item'
          onChange={changeNewItem('item')}
          value={newItem.item}
        />
        <input
          id={`new-item-value-${id.replace(/\s/g, '-')}`}
          type='text'
          className='form-control mt-2'
          placeholder='valor'
          onChange={changeNewItem('value')}
          value={
            typeof newItem.value === 'number'
              ? newItem.value.toFixed(2)
              : newItem.value
          }
        />
      </Modal>
    </Fragment>
  )
}

export default CustoFixo

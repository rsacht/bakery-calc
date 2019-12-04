import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import $ from 'jquery'
import Inputmask from 'inputmask'

import Modal from '../Modal'

import { ProductActions } from '../../store/ProductState'

const { addFornadaMes, addPrecoUnitario } = ProductActions

const Footer = ({ product }) => {
  const modalId1 = `modal-add-fornadames-${product.id.replace(/\s/g, '-')}`
  const modalId2 = `modal-add-precounitario-${product.id.replace(/\s/g, '-')}`
  const precounitarioId = `precounitario-${product.id.replace(/\s/g, '-')}`

  const [fornadames, setFornadames] = useState(0)
  const [precounitario, setPrecounitario] = useState('')
  const [err1, setErr1] = useState('')
  const [err2, setErr2] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    $(`#${modalId1}`).on('hide.bs.modal', () => {
      setFornadames(0)
      setErr1('')
    })

    $(`#${modalId2}`).on('hide.bs.modal', () => {
      setPrecounitario('')
      setErr2('')
    })

    Inputmask({
      numericInput: true,
      mask: '999 999 999,99',
      placeholder: ' ',
      showMaskOnHover: false,
      showMaskOnFocus: false
    }).mask($(`#${precounitarioId}`))

    return () => {
      $(`#${modalId1}`).off('hide.bs.modal')
      $(`#${modalId2}`).off('hide.bs.modal')
    }
  }, [])

  const changefornadames = e => setFornadames(e.target.value)
  const changeprecounitario = e => setPrecounitario(e.target.value)

  const savefornadames = () => {
    if (fornadames === 0) {
      return setErr1('Informe o número de fornadas por mês')
    }

    dispatch(addFornadaMes(product.id, fornadames))

    $(`#${modalId1}`).modal('hide')
  }

  const saveprecounitario = () => {
    const num = Number(precounitario.replace(/\s/g, '').replace(',', '.'))
    if (num <= 0) {
      return setErr2('Insira um preço unitário')
    }

    dispatch(addPrecoUnitario(product.id, num))

    $(`#${modalId2}`).modal('hide')
  }

  return (
    <Fragment>
      <div className='d-flex mt-3 flex-wrap w-100'>
        <div className='align-items-center w-100 d-flex'>
          <h6 className='m-0 p-0 col-7'>
            informe quantas fornadas de {product.name} você fará por mês:
          </h6>
          <h6 className='m-0 py-2 px-2 px-sm-4 border ml-2'>
            {product.fornadaMes}
          </h6>
          <button className='btn'>
            <i
              className='fas fa-pencil-alt'
              data-toggle='modal'
              data-target={`#${modalId1}`}
            />
          </button>
        </div>
        <div className='d-flex align-items-center mt-2 w-100'>
          <h6 className='m-0 p-0 col-7'>
            informe o preço de venda por unidade de {product.name}:
          </h6>
          <h6 className='m-0 py-2 px-2 px-sm-4 border ml-2'>
            R$ {product.precoUnitario}
          </h6>
          <button className='btn'>
            <i
              className='fas fa-pencil-alt'
              data-toggle='modal'
              data-target={`#${modalId2}`}
            />
          </button>
        </div>
      </div>
      <Modal
        id={modalId1}
        errorMessage={err1}
        onSave={savefornadames}
        title='fornama por mês'
      >
        <input
          type='number'
          className='form-control'
          placeholder='quantidade da fornada por mês'
          onChange={changefornadames}
          value={fornadames}
        />
      </Modal>
      <Modal
        id={modalId2}
        errorMessage={err2}
        onSave={saveprecounitario}
        title='preço de venda unitário'
      >
        <input
          id={precounitarioId}
          type='text'
          className='form-control'
          placeholder='preço de venda unitário'
          onChange={changeprecounitario}
          value={precounitario}
        />
      </Modal>
    </Fragment>
  )
}

export default Footer

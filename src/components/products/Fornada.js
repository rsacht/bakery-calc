import React, { Fragment, useState, useEffect } from 'react'
import $ from 'jquery'
import { useDispatch } from 'react-redux'

import Modal from '../Modal'

import { ProductActions } from '../../store/ProductState'

const { setFornada } = ProductActions

const Fornada = ({ product }) => {
  const modalId = `modal-set-fornada-${product.id.replace(/\s/g, '-')}`
  const [qtd, setQtd] = useState('')
  const [err, setErr] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    $(`#${modalId}`).on('hide.bs.modal', () => {
      setQtd('')
      setErr('')
    })

    return () => $(`#${modalId}`).off('hide.bs.modal')
  }, [])

  const changeQtd = e => setQtd(e.target.value)

  const saveQtd = () => {
    if (qtd.trim().length === 0) {
      return setErr('Insira a quantidade da fornada')
    }

    dispatch(setFornada(product.id, qtd))

    $(`#${modalId}`).modal('hide')
  }

  return (
    <Fragment>
      <div className='d-flex align-items-center'>
        <h6 className='m-0'>
          informe quantas unidades de {product.name} que você produzirá por
          fornada
        </h6>
        <h6 className='m-0 py-2 px-4 border ml-2'>{product.fornada}</h6>
        <button className='btn'>
          <i
            className='fas fa-pencil-alt'
            data-toggle='modal'
            data-target={`#${modalId}`}
          />
        </button>
      </div>
      <Modal id={modalId} errorMessage={err} onSave={saveQtd}>
        <input
          type='number'
          className='form-control'
          placeholder='quantidade da fornada'
          onChange={changeQtd}
          value={qtd}
        />
      </Modal>
    </Fragment>
  )
}

export default Fornada

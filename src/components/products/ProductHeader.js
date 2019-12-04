import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import $ from 'jquery'

import Modal from '../Modal'
import { ProductActions } from '../../store/ProductState'

const { removeProduct, cloneProduct, editProductName } = ProductActions

const ProductHeader = ({ product }) => {
  const dispatch = useDispatch()

  const modalEditId = `modal-edit-name-${product.id.replace(/\s/g, '-')}`

  const [newName, setNewName] = useState('')
  const [cloneProductErrorMsg, setCloneProductErrorMsg] = useState('')

  const [newEditName, setNewEditName] = useState(product.name)
  const [editErr, setEditErr] = useState('')

  useEffect(() => {
    $('#modal-clone-product').on('hidden.bs.modal', () => {
      setCloneProductErrorMsg('')
      setNewName('')
    })

    $(`#${modalEditId}`).on('hide.bs.modal', () => {
      setEditErr('')
      setNewEditName('')
    })

    return () => {
      $('#modal-clone-product').off('hidden.bs.modal')
      $(`#${modalEditId}`).off('hide.bs.modal')
    }
  }, [])

  const changeName = e => setNewName(e.target.value)
  const cloneHandler = () => {
    if (newName.trim().length === 0) {
      return setCloneProductErrorMsg('Insira o novo nome do produto')
    }

    dispatch(cloneProduct(product.id, newName))

    setNewName('')
    $('#modal-clone-product').modal('hide')
  }

  const changeEdit = e => setNewEditName(e.target.value)

  const editHandler = () => {
    if (newEditName.trim().length === 0) {
      return setEditErr('Insira o novo nome do produto')
    }

    if (newEditName !== product.name) {
      dispatch(editProductName(product.id, newEditName))
    }

    $(`#${modalEditId}`).modal('hide')
  }

  const deleteHandler = () => {
    dispatch(removeProduct(product.id, newName))
  }

  return (
    <Fragment>
      <div className='card-header m-0 d-flex p-1' id='headingOne'>
        <h6 className='m-0 border p-2 ml-3'>{product.name}</h6>
        <button
          className='btn'
          title='editar'
          data-toggle='modal'
          data-target={`#${modalEditId}`}
        >
          <i className='fas fa-pencil-alt' />
        </button>
        <div className='ml-auto'>
          <button
            className='btn'
            title='editar'
            data-toggle='collapse'
            data-target={`#collapse-${product.id.replace(/\s/g, '-')}`}
          >
            <i className='fas fa-pencil-alt' />
          </button>
          <button
            className='btn'
            title='editar'
            data-toggle='collapse'
            data-target={`#collapse-${product.id.replace(/\s/g, '-')}`}
          >
            <i className='fas fa-times' />
          </button>
          <button
            className='btn'
            title='clonar'
            data-toggle='modal'
            data-target='#modal-clone-product'
          >
            <i className='fas fa-copy' />
          </button>
          <button className='btn' title='excluir' onClick={deleteHandler}>
            <i className='fas fa-trash' />
          </button>
        </div>
      </div>
      <Modal
        id='modal-clone-product'
        errorMessage={cloneProductErrorMsg}
        onSave={cloneHandler}
      >
        <input
          type='text'
          className='form-control'
          placeholder='novo nome do produto'
          onChange={changeName}
          value={newName}
        />
      </Modal>
      <Modal id={modalEditId} errorMessage={editErr} onSave={editHandler}>
        <input
          type='text'
          className='form-control'
          placeholder='novo nome do produto'
          onChange={changeEdit}
          value={newEditName}
        />
      </Modal>
    </Fragment>
  )
}

export default ProductHeader

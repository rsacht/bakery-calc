import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'

import Modal from '../Modal'
import ProductSeccion from './ProductSeccion'

import { ProductActions } from '../../store/ProductState'

const { addProduct, getProducts } = ProductActions

const ProductsPage = () => {
  const products = useSelector(({ product }) => product)
  const dispatch = useDispatch()

  const [newProductName, setNewProductName] = useState('')
  const [newProductErrorMsg, setNewProductErrorMsg] = useState('')

  useEffect(() => {
    dispatch(getProducts())

    $('#modal-add-product').on('hidden.bs.modal', () => {
      setNewProductErrorMsg('')
      setNewProductName('')
    })

    return () => $('#modal-add-product').off('hidden.bs.modal')
  }, [])

  const changeNewProduct = e => setNewProductName(e.target.value)

  const saveNewProduct = () => {
    if (newProductName.trim().length === 0) {
      return setNewProductErrorMsg('Insira o nome do produto')
    }

    dispatch(addProduct(newProductName))

    setNewProductName('')
    $('#modal-add-product').modal('hide')
  }

  return (
    <Fragment>
      <div className='d-flex mx-n4 flex-column align-items-start'>
        <div className='accordion w-100' id='product-app'>
          {Object.keys(products).map(k => (
            <ProductSeccion key={k} product={products[k]} />
          ))}
        </div>

        <div className='ml-4 mt-4'>
          <button
            className='btn rounded-0 px-5 btn-success'
            data-toggle='modal'
            data-target='#modal-add-product'
          >
            <i className='fas fa-plus mr-2' />
            adicionar produto
          </button>
        </div>
      </div>
      <Modal
        id='modal-add-product'
        errorMessage={newProductErrorMsg}
        onSave={saveNewProduct}
      >
        <input
          type='text'
          className='form-control'
          placeholder='nome do produto'
          onChange={changeNewProduct}
          value={newProductName}
        />
      </Modal>
    </Fragment>
  )
}

export default ProductsPage

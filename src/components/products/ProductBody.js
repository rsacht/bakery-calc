import React from 'react'

import Fornada from './Fornada'
import IngredientsList from './IngredientsList'
import InsumosList from './InsumosList'
import Footer from './Footer'

const ProductBody = ({ product }) => {
  return (
    <div
      id={`collapse-${product.id.replace(/\s/g, '-')}`}
      className='collapse'
      data-parent='#product-app'
    >
      <div className='card-body'>
        <Fornada product={product} />
        <IngredientsList product={product} />
        <InsumosList product={product} />
        <Footer product={product} />
      </div>
    </div>
  )
}

export default ProductBody

import React from 'react'

import ProductHeader from './ProductHeader'
import ProductBody from './ProductBody'

const ProductSection = ({ product }) => {
  return (
    <div className='card'>
      <ProductHeader product={product} />

      <ProductBody product={product} />
    </div>
  )
}

export default ProductSection

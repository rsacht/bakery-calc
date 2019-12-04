import React from 'react'
import { useSelector } from 'react-redux'

const ResultBar = () => {
  const { custo, faturamento, lucro } = useSelector(({ resume }) => resume)
  return (
    <div className='row flex-md-nowrap w-100 m-0'>
      <Card value={custo} label='CUSTO' />
      <Card value={faturamento} label='FATURAMENTO' />
      <Card value={lucro} label='LUCRO' />
    </div>
  )
}

const Card = ({ value, label }) => (
  <div className='col-12 col-md-4 mb-2 mb-md-0 p-0'>
    <div className='mx-2 border px-2 shadow-sm'>
      <div className='d-flex align-items-baseline'>
        <h1 className='font-weight-bolder'>R$</h1>
        <h3 className='font-weight-bolder ml-1'>{value}</h3>
      </div>
      <p className='small mt-n3 mb-2'>{label}</p>
    </div>
  </div>
)

export default ResultBar

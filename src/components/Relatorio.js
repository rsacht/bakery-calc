import React, { useEffect, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ResumeActions } from '../store/ResumeState'

const { setResume } = ResumeActions

const Relatorio = () => {
  const { custofixo, product } = useSelector(store => store)

  const [totalProducao, setTotalProducao] = useState([])
  const [quantidadeTotal, setQuantidadeTotal] = useState(0)
  const [fixoPorUni, setFixoPorUni] = useState(0)
  const [fixoMensal, setFixoMensal] = useState(0)
  const [custoProd, setCustoProd] = useState(0)
  const [custoTotal, setCustoTotal] = useState(0)
  const [faturamento, setFaturamento] = useState(0)
  const [result, setResult] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    let custoP = 0
    let qtTotal = 0

    let prodTotal = []
    let fixoTotal = 0

    let fatTotal = 0

    Object.keys(product).map(k => {
      const p = product[k]
      const qt = p.fornada * p.fornadaMes
      qtTotal += qt
      fatTotal += qt * p.precoUnitario

      let custoTotalProduto = 0

      Object.keys(p.ingredientes).map(k => {
        const ing = p.ingredientes[k]
        custoP += ing.preco * ing.quantidade

        custoTotalProduto += ing.preco * ing.quantidade
      })

      Object.keys(p.insumos).map(k => {
        const ins = p.insumos[k]
        custoP += ins.preco * ins.quantidade

        custoTotalProduto += ins.preco * ins.quantidade
      })

      let producao = { p, total: qt, custoTotal: custoTotalProduto }
      prodTotal.push(producao)
    })

    Object.keys(custofixo).map(k => {
      const cf = custofixo[k]
      fixoTotal += cf.value
    })

    setTotalProducao(prodTotal)
    setQuantidadeTotal(qtTotal)
    setFixoPorUni(fixoTotal / qtTotal)
    setFixoMensal(fixoTotal)
    setCustoProd(custoP)

    const _custototal = fixoTotal + custoP

    setCustoTotal(_custototal)
    setFaturamento(fatTotal)

    const _result = fatTotal - _custototal
    setResult(_result)

    dispatch(setResume(_custototal, fatTotal, _result))
  }, [custofixo, product])

  return (
    <Fragment>
      <div className='w-100 d-flex justify-content-center flex-wrap'>
        <div className='row w-75'>
          {/* {totalProducao.map((item, index) => (
          <div className='row w-100 m-0' key={item.p.id}>
            <h6 className='m-0 col-8'>
              total de {item.p.name} produzidos mensalmente
            </h6>
            <h6 className='m-0 col-4'>{item.total}</h6>
          </div>
        ))} */}
          <div className='row w-100 m-0'>
            <h6 className='m-0 col-8'>total produzidos mensalmente</h6>
            <h6 className='m-0 col-4'>{quantidadeTotal}</h6>
          </div>

          <div className='row w-100 m-0'>
            <h6 className='m-0 col-8'>
              custo fixo rateado por unidade produzida
            </h6>
            <h6 className='m-0 col-4'>R$ {fixoPorUni.toFixed(2)}</h6>
          </div>
          <div className='row w-100 m-0'>
            <h6 className='m-0 col-8'>custo fixo mensal</h6>
            <h6 className='m-0 col-4'>R$ {fixoMensal.toFixed(2)}</h6>
          </div>
          <div className='row w-100 m-0'>
            <h6 className='m-0 col-8'>custo de produção</h6>
            <h6 className='m-0 col-4'>R$ {custoProd.toFixed(2)}</h6>
          </div>
          <div className='row w-100 m-0'>
            <h6 className='m-0 col-8'>custo total</h6>
            <h6 className='m-0 col-4'>R$ {custoTotal.toFixed(2)}</h6>
          </div>
          <div className='row w-100 m-0'>
            <h6 className='m-0 col-8'>faturamento</h6>
            <h6 className='m-0 col-4'>R$ {faturamento.toFixed(2)}</h6>
          </div>
          <div className='row w-100 m-0 border-top border-secondary'>
            <h6 className='m-0 col-8'>lucro/ prejuízo</h6>
            <h6 className='m-0 col-4'>R$ {result.toFixed(2)}</h6>
          </div>
        </div>
      </div>
      {totalProducao.map(({ p, total, custoTotal }, index) => (
        <div className='w-100 border mt-3'>
          <h6 className='m-0 p-2 bg-dark text-white'>{p.name}</h6>
          <div className='mt-3'>
            <h6 className='m-0 px-2'>
              unidades produzidas p/ mes:  {total} 
              <br />custo unitário:  R${' '}
              {(custoTotal / total).toFixed(2)}
              <br />custo fixo rateado: R$ {(fixoMensal / total).toFixed(2)}
              <br />
              custo total unitário: R$ 
              {((custoTotal + fixoMensal) / total).toFixed(2)}
              <br />
              preço de venda unitário: R$ {p.precoUnitario} 
              <br />
              lucro unitário: R${' '}
              {(p.precoUnitario - (custoTotal + fixoMensal) / total).toFixed(2)}{' '}
              <br />
              lucro/prejuízo: R${' '}
              {(p.precoUnitario * total - (custoTotal + fixoMensal)).toFixed(
                2
              )}{' '}
              
            </h6>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default Relatorio

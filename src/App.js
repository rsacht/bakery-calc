import React from 'react'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import Store from './store/Store'

import Title from './components/Title'
import ResultBar from './components/ResultBar'
import CustoFixo from './components/CustoFixo'
import ProductsPage from './components/products/ProductsPage'
import Relatorio from './components/Relatorio'

function App () {
  return (
    <Store>
      <div
        className='d-flex vw-100 vh-100 align-items-center justify-content-start flex-column'
        style={{ overflowX: 'hidden' }}
      >
        <Title />

        <div
          className='row d-flex w-100 justify-content-center'
          style={{ overflowX: 'hidden' }}
        >
          <div className='shadow p-1 p-sm-4 mt-4 col col-xs-12 col-md-8'>
            <ResultBar />
            <div className='row px-4 mt-3'>
              <div className='accordion w-100' id='cost-app'>
                <div className='card'>
                  <div className='card-header p-0 m-0 border-0'>
                    <button
                      className='btn btn-dark w-100 rounded-0'
                      type='button'
                      data-toggle='collapse'
                      data-target='#collapseOne'
                    >
                      CUSTO FIXO
                    </button>
                  </div>

                  <div
                    id='collapseOne'
                    className='collapse'
                    data-parent='#cost-app'
                  >
                    <div className='card-body'>
                      <CustoFixo />
                    </div>
                  </div>
                </div>

                <div className='card'>
                  <div className='card-header p-0 m-0 border-0'>
                    <button
                      className='btn btn-dark w-100 rounded-0'
                      type='button'
                      data-toggle='collapse'
                      data-target='#collapseTwo'
                    >
                      PRODUTOS
                    </button>
                  </div>

                  <div
                    id='collapseTwo'
                    className='collapse'
                    data-parent='#cost-app'
                  >
                    <div className='card-body'>
                      <ProductsPage />
                    </div>
                  </div>
                </div>

                <div className='card'>
                  <div className='card-header p-0 m-0 border-0'>
                    <button
                      className='btn btn-dark w-100 rounded-0'
                      type='button'
                      data-toggle='collapse'
                      data-target='#collapseThree'
                    >
                      RELATÓRIO
                    </button>
                  </div>

                  <div
                    id='collapseThree'
                    className='collapse'
                    data-parent='#cost-app'
                  >
                    <div className='card-body'>
                      <Relatorio />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Store>
  )
}

export default App

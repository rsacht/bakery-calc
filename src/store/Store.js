import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { custoFixoReducer } from './CustoFixoState'
import { productReducer } from './ProductState'
import { resumeReducer } from './ResumeState'

const getLogger = () =>
  process.env.NODE_ENV === 'development'
    ? logger
    : () => next => action => next(action)

const store = createStore(
  combineReducers({
    custofixo: custoFixoReducer,
    product: productReducer,
    resume: resumeReducer
  }),
  applyMiddleware(thunk, getLogger())
)

const Store = ({ children }) => <Provider store={store}>{children}</Provider>

export default Store

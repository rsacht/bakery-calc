/*{
  'pao-123': {
    id: 'pao-123',
    name: 'Pão Francês',
    fornada: 15,
    fornadaMes: 30,
    precoUnitario: 10,
    ingredientes: {
      'trigo-123': {
        id: 'trigo-123',
        name: 'trigo',
        medida: 'kg',
        preco: 30,
        quantidade: 50
      }
    },
    insumos: {
      'gas-123': {
        id: 'gas-123',
        name: 'Gás',
        medida: 'kg',
        preco: 10,
        quantidade: 100
      }
    }
  }
}*/
import createHash from 'hash-generator'

export const ProductEvent = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  GET_PRODUCTS: 'GET_PRODUCTS',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CLONE_PRODUCT: 'CLONE_PRODUCT',
  SET_FORNADA: 'SET_FORNADA',
  ADD_INGREDIENTE: 'ADD_INGREDIENTE',
  DELETE_INGREDIENTE: 'DELETE_INGREDIENTE',
  ADD_INSUMO: 'ADD_INSUMO',
  DELETE_INSUMO: 'DELETE_INSUMO',
  ADD_FORNADA_MES: 'ADD_FORNADA_MES',
  ADD_PRECO_UNITARIO: 'ADD_PRECO_UNITARIO',
  EDIT_PRODUCT_NAME: 'EDIT_PRODUCT_NAME'
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductEvent.GET_PRODUCTS: {
      const local = localStorage.getItem('productdata')
      if (local) {
        state = JSON.parse(local)
        return state
      } else {
        return state
      }
    }
    case ProductEvent.ADD_PRODUCT: {
      const name = action.payload
      const id = `${name}-${createHash(8)}`
      const template = {
        id,
        name,
        fornada: 0,
        fornadaMes: 0,
        precoUnitario: 0,
        ingredientes: {},
        insumos: {}
      }

      state = { ...state, [id]: template }

      saveLocal(state)

      return state
    }
    case ProductEvent.DELETE_PRODUCT: {
      const id = action.payload

      delete state[id]

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.CLONE_PRODUCT: {
      const { id, newName } = action.payload

      const newId = `${newName}-${createHash(8)}`

      const copy = { ...state[id] }
      copy.id = newId
      copy.name = newName

      state[newId] = { ...copy }

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.SET_FORNADA: {
      const { id, qtd } = action.payload

      state[id].fornada = qtd

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.ADD_INGREDIENTE: {
      const {
        id,
        ingrediente: { ingrediente: name, medida, preco, qtd: quantidade }
      } = action.payload

      const ingredienteId = `${name}-${createHash(8)}`

      state[id].ingredientes[ingredienteId] = {
        id: ingredienteId,
        name,
        medida,
        preco,
        quantidade
      }

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.DELETE_INGREDIENTE: {
      const { prodId, ingredienteId } = action.payload

      delete state[prodId].ingredientes[ingredienteId]

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.ADD_INSUMO: {
      const {
        id,
        insumo: { insumo: name, medida, preco, qtd: quantidade }
      } = action.payload

      const insumoId = `${name}-${createHash(8)}`

      state[id].insumos[insumoId] = {
        id: insumoId,
        name,
        medida,
        preco,
        quantidade
      }

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.DELETE_INSUMO: {
      const { prodId, insumoId } = action.payload

      delete state[prodId].insumos[insumoId]

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.ADD_PRECO_UNITARIO: {
      const { id, preco } = action.payload

      state[id].precoUnitario = preco

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.ADD_FORNADA_MES: {
      const { id, qtd } = action.payload

      state[id].fornadaMes = qtd

      saveLocal(state)

      return { ...state }
    }
    case ProductEvent.EDIT_PRODUCT_NAME: {
      const { id, name } = action.payload

      state[id].name = name

      saveLocal(state)

      return { ...state }
    }
    default:
      return state
  }
}

function saveLocal (data) {
  localStorage.setItem('productdata', JSON.stringify(data))
}

export const ProductActions = {
  addProduct: name => ({ type: ProductEvent.ADD_PRODUCT, payload: name }),
  getProducts: () => ({ type: ProductEvent.GET_PRODUCTS }),
  removeProduct: id => ({ type: ProductEvent.DELETE_PRODUCT, payload: id }),
  cloneProduct: (id, newName) => ({
    type: ProductEvent.CLONE_PRODUCT,
    payload: { id, newName }
  }),
  setFornada: (id, qtd) => ({
    type: ProductEvent.SET_FORNADA,
    payload: { id, qtd }
  }),
  addIngrediente: (id, ingrediente) => ({
    type: ProductEvent.ADD_INGREDIENTE,
    payload: { id, ingrediente }
  }),
  removeIngrediente: (prodId, ingredienteId) => ({
    type: ProductEvent.DELETE_INGREDIENTE,
    payload: { prodId, ingredienteId }
  }),
  addInsumo: (id, insumo) => ({
    type: ProductEvent.ADD_INSUMO,
    payload: { id, insumo }
  }),
  removeInsumo: (prodId, insumoId) => ({
    type: ProductEvent.DELETE_INSUMO,
    payload: { prodId, insumoId }
  }),
  addFornadaMes: (id, qtd) => ({
    type: ProductEvent.ADD_FORNADA_MES,
    payload: { id, qtd }
  }),
  addPrecoUnitario: (id, preco) => ({
    type: ProductEvent.ADD_PRECO_UNITARIO,
    payload: { id, preco }
  }),
  editProductName: (id, name) => ({
    type: ProductEvent.EDIT_PRODUCT_NAME,
    payload: { id, name }
  })
}

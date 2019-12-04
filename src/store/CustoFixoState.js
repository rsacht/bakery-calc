//{name-hash: {id: name-hash, item: string, value: number}}
import createHash from 'hash-generator'

export const CustoFixoEvents = {
  GET_CUSTO_FIXO: 'GET_CUSTO_FIXO',
  SAVE_ITEM: 'SAVE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM'
}
export const custoFixoReducer = (state = {}, action) => {
  switch (action.type) {
    case CustoFixoEvents.GET_CUSTO_FIXO:
      const local = localStorage.getItem('custofixodata')
      if (local) {
        state = JSON.parse(local)
        return state
      } else {
        return state
      }
    case CustoFixoEvents.SAVE_ITEM: {
      const hash = createHash(8)
      const item = action.payload
      const id = `${item.item}-${hash}`
      state = {
        ...state,
        [id]: { id, ...item }
      }

      localStorage.setItem('custofixodata', JSON.stringify(state))

      return state
    }
    case CustoFixoEvents.REMOVE_ITEM: {
      const id = action.payload
      delete state[id]

      localStorage.setItem('custofixodata', JSON.stringify(state))

      return { ...state }
    }
    case CustoFixoEvents.EDIT_ITEM: {
      const { id, item, value } = action.payload

      state[id] = {
        ...state[id],
        item,
        value
      }

      localStorage.setItem('custofixodata', JSON.stringify(state))

      return { ...state }
    }

    default:
      return state
  }
}

export const CustoFixoAction = {
  getFromLocal: () => ({ type: CustoFixoEvents.GET_CUSTO_FIXO }),
  saveItem: item => ({ type: CustoFixoEvents.SAVE_ITEM, payload: item }),
  removeItem: id => ({ type: CustoFixoEvents.REMOVE_ITEM, payload: id }),
  editItem: (id, { item, value }) => ({
    type: CustoFixoEvents.EDIT_ITEM,
    payload: { id, item, value }
  })
}

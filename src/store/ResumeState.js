export const resumeReducer = (
  state = { custo: 0, faturamento: 0, lucro: 0 },
  action
) => {
  switch (action.type) {
    case 'SET_RESUME': {
      const { custo, faturamento, lucro } = action.payload

      state = {
        ...state,
        custo,
        faturamento,
        lucro
      }

      return state
    }
    default:
      return state
  }
}

export const ResumeActions = {
  setResume: (custo, faturamento, lucro) => ({
    type: 'SET_RESUME',
    payload: { custo, faturamento, lucro }
  })
}

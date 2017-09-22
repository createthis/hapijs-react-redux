export const setFiscalYear = (fiscal_year) => ({
  type: 'SET_FISCAL_YEAR',
  fiscal_year
})

export const toggleFilterOpen = () => ({
  type: 'TOGGLE_FILTER_OPEN'
})

export const addParentName = (parent_name) => ({
  type: 'ADD_PARENT_NAME',
  parent_name
})


export const removeParentName = (parent_name) => ({
  type: 'REMOVE_PARENT_NAME',
  parent_name
})

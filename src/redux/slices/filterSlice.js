import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  category: {
    name: 'Все',
    id: 0
  },
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },
})
export const selectFilter = state => state.filter
export const selectSort = state => state.filter.sort

export const { setCategory, setSort, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
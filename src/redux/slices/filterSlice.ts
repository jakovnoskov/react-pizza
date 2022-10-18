import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type Sort = {
  name: string
  sortProperty: string
}

export type Category = {
  id: number
  name: string
}

interface FilterSliceState {
  searchValue: string
  category: Category
  currentPage: number
  sort: Sort
}

const initialState: FilterSliceState = {
  searchValue: '',
  category: {
    id: 1,
    name: 'Все',
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
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.category = action.payload.category
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1;
        state.category = {
          id: 0,
          name: 'Все',
        }
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        }
      }
    },
  },
})
export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
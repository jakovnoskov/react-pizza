import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import { RootState } from '../store'

type Pizza = {
  id: string,
  imageUrl: string,
  name: string,
  types: number[],
  sizes: number[],
  price: number,
}

export enum Status {
  LOADING = 'loading',
  COMPLITED = 'completed',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[]
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | completed | error
}

export type SearchPizzaParams = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, categoryId, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(`https://63448999dcae733e8fe1045c.mockapi.io/items`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 4,
          categoryId,
          sortBy,
          order,
          search,
        },
        identity,
      ),
    })
    return data
  }
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.COMPLITED
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
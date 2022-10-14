import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, categoryId, search, currentPage } = params
    const { data } = await axios.get(`https://63448999dcae733e8fe1045c.mockapi.io/items`, {
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

const initialState = {
  items: [],
  status: 'loading', // loading | completed | error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading'
      state.items = []
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'completed'
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error'
      state.items = []
    });
  },
})

export const selectPizzaData = state => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
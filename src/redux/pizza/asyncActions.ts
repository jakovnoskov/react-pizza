import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, categoryId, search, currentPage } = params;
    //console.log(params, 4444);
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
    });

    return data;
  },
)
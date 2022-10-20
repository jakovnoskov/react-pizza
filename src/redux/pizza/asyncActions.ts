import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { LooseObject } from '../../@types/appType';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    console.log(params, 4444);
    const paramsToFech: LooseObject = { limit: 4 };

    if (sortBy) paramsToFech.sortBy = sortBy
    if (order) paramsToFech.order = order
    if (category) paramsToFech.category = category
    if (search) paramsToFech.search = search
    if (currentPage) paramsToFech.page = currentPage

    console.log('paramsToFech', paramsToFech);

    const { data } = await axios.get<Pizza[]>(`https://63448999dcae733e8fe1045c.mockapi.io/items`, {
      params: pickBy(paramsToFech, identity,),
    });
    console.log('data', data);
    return data;
  },
)
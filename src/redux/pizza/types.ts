export type Pizza = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  COMPLITED = 'completed',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  categoryId: string;
  search: string;
  currentPage: string;
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
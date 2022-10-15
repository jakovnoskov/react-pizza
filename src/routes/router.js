import { createHashRouter } from 'react-router-dom'
import Root from './Root'
import Catalog from './Catalog'
import Cart from './Cart'
import FullPizza from './FullPizza'
import Orders from './Orders'
import NotFound from './NotFound'
import ErrorPage from './ErrorPage'
import Detail from './Detail'

export const router = createHashRouter([
  {
    path: '',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/',
        element: <Catalog />,
      },
      {
        path: 'pizza/:id',
        element: <Detail />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'fullPizza',
        element: <FullPizza />,
      },
    ],
  },
]) 
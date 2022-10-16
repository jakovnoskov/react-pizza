import { createHashRouter } from 'react-router-dom'
import { Root } from './Root'
import Catalog from './Catalog'
import Detail from './Detail'
import Cart from './Cart'
import { Orders } from './Orders'
import NotFound from './NotFound'
import ErrorPage from './ErrorPage'

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
    ],
  },
]) 
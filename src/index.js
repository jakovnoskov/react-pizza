import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import router from './routes/router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
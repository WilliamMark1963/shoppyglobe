import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import ProductDetail from './Components/ProductDetail.jsx'
import CheckOut from './Components/CheckOut.jsx'
import NotFound from './Components/NotFound.jsx'
import Body from './Components/Body.jsx'

const appRouter =createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <NotFound />,
    children:[
      {
        path:'/',
        element: <Body/>
      },
      {
        path:"/product/:id",
        element: <ProductDetail/>
      },
      {
        path:"/checkout",
        element: <CheckOut/>
      }
    ]
  },

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)

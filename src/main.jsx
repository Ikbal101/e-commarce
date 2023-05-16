import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './component/Layout/Home';
import Shop from './component/Shop/Shop';
import Oders from './component/Orders/Oders';
import Inventory from './component/Inventory/Inventory';
import Login from './component/Login/Login';
import cartComponent from './component/Loader/CartComponent';
import Checkout from './component/CheckOut/Checkout';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children:[
      {
        path:"/",
        element:<Shop/>,
        loader:()=> fetch(`http://localhost:4000/totalProducts`)
      },
      {
        path:"orders",
        element:<Oders/>,
        loader: cartComponent,
      },
      {
        path:"inventory",
        element:<Inventory/>,
      },
      {
        path:"checkout",
        element:<Checkout/>,
      },
      {
        path:"login",
        element:<Login/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import { createBrowserRouter, RouterProvider } from "react-router"
import Home from './ui/Home'
import Menu from './features/menu/Menu'
import Order from './features/order/Order'
import CreateOrder from './features/order/CreateOrder'
import Cart from './features/cart/Cart'
import AppLayout from "./ui/AppLayout"


function App() {
  /*This syntax is new in react-router v.6, and it's necessary to enable data loading*/
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/menu",
          element: <Menu />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/order",
          element: <Order />
        },
        {
          path: "/order/new",
          element: <CreateOrder />
        },
        {
          path: "/order/:orderId",
          element: <Order />
        },
      ]
    },
  ])
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

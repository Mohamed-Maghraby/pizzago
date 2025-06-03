import { createBrowserRouter, RouterProvider } from "react-router"
import Home from './ui/Home'
import Menu, {loader as menuLoader} from './features/menu/Menu' //import named fn loader and name as menuLoader
import Order, {loader as orderLoader} from './features/order/Order'
import CreateOrder, {action as orderAction} from './features/order/CreateOrder'
import Cart from './features/cart/Cart'
import AppLayout from "./ui/AppLayout"
import Error from "./ui/Error"


function App() {
  /*
  This syntax is new in react-router v.6, and it's necessary to enable data loading.
  Using loader property to assign a loader function, which fetches data from a server.
  ErrorElement: is a property can be assigned in every route which displays an element.
  Using action property to assign an action function, which gets executed on form submit.
  */
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error/>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error/>
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
          element: <CreateOrder />,
          action: orderAction,
          errorElement: <Error/>
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          errorElement: <Error/>
        },
      ]
    },
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

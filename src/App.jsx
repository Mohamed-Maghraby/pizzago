import { RouterProvider, createBrowserRouter } from 'react-router';

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader, loader as orderLoader } from './features/order/Order';
import {action as UpdateOrderAction} from './features/order/UpdateOrder'
import AppLayout from './ui/AppLayout';

/*
This syntax is new in react-router v.6, and it's necessary to enable data loading.
Using loader property to assign a loader function, which fetches data from a server.
ErrorElement: is a property can be assigned in every route which displays an element.
Using action property to assign an action function, which gets executed on form submit.
*/
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action : UpdateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Link } from 'react-router';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {clearCart, getCart} from './cartSlice'


function Cart() {
    const username = useSelector((state)=>state.user.username)
    const cart = useSelector(getCart) //getting the real cart using a selector defined in cartSlice
    const cartLength = !!cart.length
    const dispatch = useDispatch()

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      {!cartLength && <p>No orders yet! Go to menu</p>}

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {cartLength &&  <Button to="/order/new" type="primary">Order pizzas</Button>}
        {cartLength && <Button type="secondary" onClick={()=>dispatch(clearCart())} disabled={!cartLength}>Clear cart</Button>}
      </div>
    </div>
  );
}

export default Cart;

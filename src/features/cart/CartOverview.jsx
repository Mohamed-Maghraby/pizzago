import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  /**
   * Creating some complex selector to sum all quantities of all objects in the cart 
   * redux recommend doing such calculations inside the selector call back fn as we did not inside the component
   */
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (!totalCartQuantity) return
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity}</span>
        <span>{totalCartPrice}$</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

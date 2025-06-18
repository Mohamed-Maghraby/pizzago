import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, deleteItem, getCurrentQuantityById } from '../cart/cartSlice';
import { useNavigate } from 'react-router';
import { Trash } from 'lucide-react';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    //scheme of the new cart object
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
    // navigate('/cart')

  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          <div className='flex flex-row items-center gap-2'>
            {isInCart && <div className='flex flex-row items-center'>
              <UpdateItemQuantity pizzaId={id}></UpdateItemQuantity>
              <Trash onClick={() => dispatch(deleteItem(id))} className={` hover:fill-amber-300 cursor-pointer`} />
            </div>}


            {!soldOut && !isInCart && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

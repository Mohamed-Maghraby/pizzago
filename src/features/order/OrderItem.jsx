import { formatCurrency } from '../../utils/helpers';

/**
 * Tip: existence of and entity can cause an error if something else depends on it
 * Ex: if ingredients does not exits we will face an error so always check with optional chaining for objects or if statements
 * For more advanced development consider the following 
 * (typed js with typescript to ensure consistency of types you create and always receive the same type )
 * (error handling in react to discover and handle possible errors)
 * (Testing environment) 
 * it will be easier to handle expected errors, bugs, typed-related problems and testing application from the beginning 
 */

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <div>
          <span className="font-bold">{quantity}&times;</span> {name}
          <p className='italic text-xs'>{isLoadingIngredients? 'loading...' : ingredients?.join(' ,')}</p>
        </div>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;

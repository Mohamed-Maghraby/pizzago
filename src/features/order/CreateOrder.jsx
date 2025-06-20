import { useEffect, useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';
import { MapPinHouse } from 'lucide-react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch()

  const cart = useSelector(getCart) //getting the real cart using a selector defined in cartSlice
  // if (!cart.length) return <p>No cart</p>
  const { username, address, error:addressError, status } = useSelector((state) => state.user)

  const isLoadingAddress = status === 'loading'
  const isAddress = address === ''

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  async function handleFetchAddress(e) {
    e.preventDefault()
    dispatch(fetchAddress())
    console.log(address);
  }
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
              {status === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}

            <button aria-label="Access your geolocation" disabled={!isAddress || isLoadingAddress} onClick={handleFetchAddress} title='Access your current geolocation' className='absolute top-10 right-2 sm:top-2 md:top-3 cursor-pointer'>
              <MapPinHouse size={20}  className={`hover:fill-amber-300 ${!isAddress? 'fill-amber-300': ''}`} />
            </button>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order....' : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

/*
Actions are like loaders act like a middleware. It's a fn that gets executed on a 
form submit. Here we don't use the standard html form but a special one provided by react-router.
In action we can access the request object from it's parameter which contain all form data, thus 
we don't need to create controlled component in which we have a state for each field with onChange to update
this fn should be invoked at route definition in like loader
*/
export async function action({ request }) {
  //formdata comes as entries we have to create it form entry prop
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  //getting our form data ready, cart info comes form a hidden input in the form
  const orderReadyToGo = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  //defining an error object, if phone is not valid we add to error
  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number"
  }
  //if error contain at least 1 prop we return it 
  if (Object.keys(errors).length > 0) return errors;

  //post the order using api fns in services
  const order = await createOrder(orderReadyToGo)

  //we should clear the cart after placing the orders
  //can't use 'useDispatch' here hooks are only used in components, we should invoke dispatch directly from the store
  //This technique should not be overused
  store.dispatch(clearCart())

  //here we use 'redirect' fn at return to navigate after this action is done (submitting), since we can't use 'useNavigate' hook inside a fn
  return redirect(`/order/${order.id}`);
}

export default CreateOrder;

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { createOrder } from "../../services/apiRestaurant";
import Order from "./Order";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const formErrors = useActionData()
  
  const cart = fakeCart;
  const isSubmitting = navigation.state === 'submitting';


  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <div>{formErrors.phone}</div>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>
        <input name="cart" type="hidden" value={JSON.stringify(cart)}/>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button disabled={isSubmitting}>{isSubmitting? 'Placing order...': 'Order now'}</button>
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
export async function action ({request}) {
  //object comes generic so we have to create it form entry prop
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  //getting our form data ready, cart info comes form a hidden input in the form
  const orderReadyToGo = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on'
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

  //here we use 'redirect' fn at return to navigate after this action is done (submitting), since we can't use 'useNavigate' hook inside a fn
  return redirect(`/order/${order.id}`);
} 

export default CreateOrder;

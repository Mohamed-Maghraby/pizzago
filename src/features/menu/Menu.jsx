import { useLoaderData } from 'react-router';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function Menu() {
  /*
  using useLoaderData hook to fetch get the data fetched in the loader, react-router knows exactly which loader 
  associated with which router since you defined the loader inside the menu defining path in createBrowserRouter 
  */
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//creating a loader fn, inside we use getMenu methods from fns implemented in apiRestaurant
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

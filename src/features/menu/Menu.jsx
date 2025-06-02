import MenuItem from '../menu/MenuItem'
import { useLoaderData } from 'react-router';
import {getMenu} from '../../services/apiRestaurant'

function Menu() {
  /*
  using useLoaderData hook to fetch get the data fetched in the loader, react-router knows exactly which loader 
  associated with which router since you defined the loader inside the menu defining path in createBrowserRouter 
  */
  const menu = useLoaderData()
  return (
    <div>
      <h1>Menu</h1> 
      {menu.map((p, i)=>{
        return <MenuItem pizza={p} key={i}></MenuItem>
      })}
    </div>
  )
}
//creating a loader fn, inside we use getMenu methods from fns implemented in apiRestaurant
export async function loader () {
  try {
    const menu = await getMenu()
    return menu;

  } catch (error) {
    console.log(error);
  }
}

export default Menu;

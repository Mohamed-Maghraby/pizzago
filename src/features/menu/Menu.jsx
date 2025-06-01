import MenuItem from '../menu/MenuItem'
import { useLoaderData } from 'react-router';
import {getMenu} from '../../services/apiRestaurant'

function Menu() {
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
export async function loader () {
  try {
    const menu = await getMenu()
    return menu;

  } catch (error) {
    console.log(error);
  }
}

export default Menu;

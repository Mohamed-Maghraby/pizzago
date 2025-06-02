import { Link } from 'react-router'
import SearchOrder from '../features/order/SearchOrder'

function Header() {
  return (
    <div>
        <Link to='/'>PizzaGo</Link>
        <p>Lorem ipsum dolor</p>
        <SearchOrder></SearchOrder>
    </div>
  )
}

export default Header
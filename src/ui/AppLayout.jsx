import { Outlet } from "react-router"
import Header from "./Header"

function AppLayout() {
  return (
    <div>
        <Header></Header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer><h2>this is footer</h2></footer>
    </div>
  )
}

export default AppLayout
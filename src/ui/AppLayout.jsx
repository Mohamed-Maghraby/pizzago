import { Outlet, useNavigation } from "react-router"
import Header from "./Header"
import Loading from "./Loading"

function AppLayout() {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'
    /*
    Using AppLayout as the parent route that handle children routes, it's used to define constant UI elements
    and has a gap that gets filled when a certain route gets triggered, the gap is filled with the 
    component associated with the path
    */
  return (
    <div className="layout">
        {isLoading && <Loading></Loading>}
        <Header></Header>
        <main>
            {/* using Outlet to render components dynamically based on the navigated router */}
            <Outlet></Outlet>
        </main>
        <footer><h2>this is footer</h2></footer>
    </div>
  )
}

export default AppLayout
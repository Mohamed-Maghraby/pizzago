import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
    /*
    Using AppLayout as the parent route that handle children routes, it's used to define constant UI elements
    and has a gap that gets filled when a certain route gets triggered, the gap is filled with the 
    component associated with the path
    */
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* using Outlet to render components dynamically based on the navigated router */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

import Footer from "./Footer";
import MainNavigation from "./MainNavigation"
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <MainNavigation />
      <div>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout

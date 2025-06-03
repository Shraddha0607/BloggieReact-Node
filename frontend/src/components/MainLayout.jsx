import Footer from "./Footer";
import Header from "./Header"
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout

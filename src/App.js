import RestaurantsListPage from './components/RestaurantsListPage/RestaurantsListPage';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/404/NotFound';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import ModalWindow from './components/ModalWindow/ModalWindow';
import MenuItemDetails from './components/MenuItemDetails/MenuItemDetails';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';

function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <>
      <Header />
        <main className="page">
            <ToastContainer />
          <Routes>
            <Route path="/" element={<RestaurantsListPage />} />
            <Route path="/uber-eats" element={<RestaurantsListPage />} />
            <Route path="/:id" element={<RestaurantPage />} />
            <Route path="/cart" exact element={ <Cart/> } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      <Footer />
        {isOpen &&
          <ModalWindow>
            <MenuItemDetails />
          </ModalWindow>
        }
    </>
  );
}

export default App;
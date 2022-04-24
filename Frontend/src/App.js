// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import EditProfilePage from './components/Profile/EditProfilePage';
import ShopName from './components/Shop/ShopName';
import ShopPage from './components/Shop/ShopPage';
import ItemPage from './components/Item/ItemPage';
import CartPage from './components/Cart/CartPage';
import OrderHistory from './components/OrderHistory/OrderHistory';
import SearchPage from './components/Search/SearchPage';

function App() {
  return (


    <div >
      <BrowserRouter>
      <div className="content-container">
          <NavBar>New navigation</NavBar>
      
        <Routes>
        <Route exact path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/edit-profile-page" element={<EditProfilePage />} />
          <Route path="/name-your-shop" element={<ShopName />} />
          <Route path="/shop-page" element={<ShopPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

        </div>
        <div className="footer--pin">
          <Footer  />
        </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;

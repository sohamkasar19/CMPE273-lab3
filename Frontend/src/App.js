// import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';


function App() {
  return (


    <div >
       
     
      <BrowserRouter>
      <div className="content-container">
          <NavBar>New navigation</NavBar>
      
        <Routes>
        <Route exact path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        
          {/* <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/item" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/purchase-details" element={<PurchaseDetailsPage />} />
          <Route path="/your-shop" element={<ShopPage />} />
          <Route path="/name-your-shop" element={<ShopName />} />
          <Route path="/search-page" element={<SearchPage />} /> */}
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

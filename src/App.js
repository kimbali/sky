import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Explore from './Pages/Explore';
import Offers from './Pages/Offers';
import ForgotPassword from './Pages/ForgotPassword';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import NavBar from './components/NavBar';
import Category from './Pages/Category';
import CreateListing from './Pages/CreateListing';
import Listing from './Pages/Listing';
import Contact from './Pages/Contact';
import EditListing from './Pages/EditListing';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
        </Routes>

        <NavBar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;

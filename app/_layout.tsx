import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import Home from './(tabs)/home';
import Detail from "./(tabs)/detail";
import CartScreen from "./(tabs)/CartScreen"
export default function TabLayout() {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <SignUp /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/cartscreen" element={<CartScreen />} />
      </Routes>
    </Router>
  );
}
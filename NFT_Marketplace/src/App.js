import React, { useState } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/navbar/Navigation';
import Explore from './components/explore/Explore';
import Profile from './components/profile/Profile';
import "./App.css";

const App = function AppWrapper() {

  const [accounts, setAccounts] = useState([]);

  return (
    <>
      <BrowserRouter basename="/VMS_Marketplace_polygon">
          <Navigation accounts={accounts} setAccounts = {setAccounts}  />
          <Routes>
            <Route path="/" exact element={<Explore accounts={accounts} setAccounts = {setAccounts} />} />
            <Route path="/explore" element={<Explore accounts={accounts} setAccounts = {setAccounts} />} />
            <Route path="/profile" element={<Profile accounts={accounts} setAccounts = {setAccounts} />} />
          </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

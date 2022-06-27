import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Create  from "../create/Create";

import './Navigation.css'


 const Navigation = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }
   
  return (
      <>

      <nav className="navbar-main p-2 border-b-2">
          <h1 className='py-4 px-4 font-bold text-3xl'>VMS Marketplace</h1>
          <div className='div-links'>
              <Link to="/explore" className="navbar-links rounded-pill py-3 m-1">
                  Explore
              </Link>

              <Link to="/profile" className="navbar-links rounded-pill py-3 m-1">
                  My NFTs
              </Link>

              <Create accounts={accounts} />

              {!isConnected ? (
                  <>
                      <Button type='button' onClick={connectAccount} variant="outline-dark" className="navbar-btn rounded-pill px-5 m-1">Connect Wallet</Button>
                  </>
              ): (
                  <>
                      <Button type='button' variant="outline-dark" className="navbar-btn rounded-pill px-5 m-1">LOGOUT</Button>
                  </>
              )}
          </div>
      </nav>
      </>
  )
}

export default Navigation

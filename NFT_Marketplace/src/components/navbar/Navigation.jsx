import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Create  from "../create/Create";
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"

import './Navigation.css'


 const Navigation = () => {


  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })

  const { account, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
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

              <Create />

              {!account ? (
                  <>
                      <Button type='button' onClick={connect} variant="outline-dark" className="navbar-btn rounded-pill px-5 m-1">Connect Wallet</Button>
                  </>
              ): (
                  <>
                      <Button type='button' onClick={disconnect} variant="outline-dark" className="navbar-btn rounded-pill px-5 m-1">LOGOUT</Button>
                  </>
              )}
          </div>
      </nav>
      </>
  )
}

export default Navigation

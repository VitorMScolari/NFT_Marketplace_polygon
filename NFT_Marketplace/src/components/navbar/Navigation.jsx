import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Create  from "../create/Create";
import './Navigation.css'
import { useWeb3React } from "@web3-react/core"
import { injected } from '../../hooks/connectors';


 const Navigation = () => {

  //connector, library, chainId, account, activate, deactivate
	const web3reactContext = useWeb3React();

  const disconnect = () => {
		try {
			web3reactContext.deactivate();
		} catch (ex) {
			console.log(ex);
		}
	};

  //web3react metamask
	const connect = async () => {
		try {
			await web3reactContext.activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	};

   
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

              {!web3reactContext.account ? (
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

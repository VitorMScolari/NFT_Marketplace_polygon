import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
require('dotenv').config({path: '.env'});


const RPC_URLS = {
	1: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
	3: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
	4: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
	5: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
	42: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
	137: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_ID}`,
	80001: process.env.ALCHEMY_URL
};

/*
* 1 - ethereum mainnet
* 3 - ropsten
* 4 - rinkeby
* 5 - goerli
* 42 - kovan
* 137 - polygon mainnet
* 80001 - mumbai (polygon testnet)
*/

//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [ 1, 3, 4, 5, 42, 137, 80001 ]
});


export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1],
		4: RPC_URLS[4]
	},
	qrcode: true,
	pollingInterval: 15000
});


export function resetWalletConnector(connector) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}

//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[4],
	appName: 'demo-app',
	supportedChainIds: [ 1, 3, 4, 5, 42, 137, 80001 ]
});

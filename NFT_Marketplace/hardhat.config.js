require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path: '.env'});

require("@nomiclabs/hardhat-waffle");
require("@tenderly/hardhat-tenderly");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const mnemonic = (variable, optional = false) => {
  if (!process.env[variable]) {
    if (optional) {
      console.warn(`[@env]: Environmental variable for ${variable} is not supplied.`)
    } else {
      throw new Error(`You must create an environment variable for ${variable}`)
    }
  }

  return process.env[variable]?.replace(/\\n/gm, '\n')
}

// Select the network you want to deploy to here:
//
const defaultNetwork = "localhost";

const mainnetGwei = 115;

/*
function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}
*/

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork,
  solidity: "0.8.4",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0",
      },
      chainId: 44787,
    },
    localhost: {
      url: "http://localhost:8545",
      // notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
      // (you can put in a mnemonic here to set the deployer locally)
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      gasPrice: mainnetGwei * 1000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    mumbai: {
      url: "https://rpc-mainnet.maticvigil.com/",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
};

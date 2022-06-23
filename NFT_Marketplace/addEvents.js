const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")
let chainId = process.env.chainId || 31337
const moralisChaindId = chainId === "31337" ? "1337" : chainId
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

const serverUrl = process.env.MORALIS_PUBLIC_SERVER_URL
const appId = process.env.MORALIS_PUBLIC_APP_ID
const masterKey = process.env.MORALILS_MASTER_KEY

async function main() {
    await Moralis.start({ serverUrl, appId, masterKey })
    console.log(`Working with contract address ${contractAddress}`)

    // do this object for all events you´d like to monitor
    let itemListedOptions = {
        // Moralis understands a local chain is 1337
        chainId: moralisChaindId,
        sync_historical: true,
        topic: "ItemListed(address, address, uint256, uint256)",
        abi: {
            // get from artifcats -> contracts -> in the json file with the contract abi, look for the part that contains the event
        },
        tableName: "itemListed",
        address: contractAddresses
    }

    let itemBoughtOptions = {
        
    }

    const listedResponse = await Moralis.Cloud.run("watchContractEvent", itemListedOptions, {
        useMasterKey: true,
    })

    const boughtResponse = await Moralis.Cloud.run("watchContractEvent", itemBoughtOptions, {
        useMasterKey: true,
    })
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

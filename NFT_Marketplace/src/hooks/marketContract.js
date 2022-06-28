import { getContract } from "./useContract";
import {marketAbi} from "../contracts/Marketplace";
import MarketContractAddress from "../contracts/Marketplace-address.json";
import { useWeb3React } from "@web3-react/core"


export const useMarketContract = () => {
  const web3reactContext = useWeb3React();
  getContract(web3reactContext.library, web3reactContext.account, marketAbi[0]['abi'], MarketContractAddress.address);
}

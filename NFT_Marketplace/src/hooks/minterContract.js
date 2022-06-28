import { getContract } from "./useContract";
import { nftAbi } from "../contracts/NFT";
import NFTContractAddress from "../contracts/NFT-address.json";
import { useWeb3React } from "@web3-react/core"


export const useMinterContract = () => {
  const web3reactContext = useWeb3React();
  getContract(web3reactContext.library, web3reactContext.account, nftAbi[0]['abi'], NFTContractAddress.address);
}


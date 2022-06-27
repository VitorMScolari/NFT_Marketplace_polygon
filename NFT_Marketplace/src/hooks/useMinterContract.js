import { useContract } from "./useContract";
import NFTAbi from "../contracts/NFT.json";
import NFTContractAddress from "../contracts/NFT-address.json";

export const useMinterContract = (userAddress) =>
  useContract(NFTAbi.abi, NFTContractAddress.address, userAddress);


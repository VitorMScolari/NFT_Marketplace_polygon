import { useState, useEffect, useCallback } from "react";
import { ethers } from 'ethers'

export const useContract = (abi, contractAddress, userAddress) => {

  const [contract, setContract] = useState(null);

  const getContract = useCallback(async () => {
    setContract(new ethers.Contract(abi, contractAddress, userAddress));
  }, [userAddress, abi, contractAddress]);

  useEffect(() => {
    if (userAddress) getContract();
  }, [userAddress, getContract]);

  return contract;
};

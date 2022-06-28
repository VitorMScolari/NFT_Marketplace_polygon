import { Contract } from '@ethersproject/contracts';


export const getContract = (library, account, contractAddress, contractAbi) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, contractAbi, signer);
	return contract;
};

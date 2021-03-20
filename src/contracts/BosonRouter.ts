import { ethers } from 'ethers';
import { Web3Contract } from "../web3/web3.contract";
import abi from '../../abis/BosonRouter.json';


export class BosonRouter extends Web3Contract {
    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, abi.abi, signerOrProvider);
    }

    async createOrder() {
        const latestBlock = await this.contract.provider.getBlock('latest');
        const from = latestBlock.timestamp;
        const to = from + 2 * 24*3600; // 2 days
        const product_price = '30000000000000000'; // 0.03
        const seller_deposit = '5000000000000000'; // 0.005
        const buyer_deposit = '4000000000000000'; // 0.004
        const quantity = 10;
        const txValue = ethers.BigNumber.from(seller_deposit).mul(quantity);
        const response = await this.contract.requestCreateOrderETHETH([
            from, to, product_price, seller_deposit, buyer_deposit, quantity
        ], { value: txValue});
        console.log('Tx sent', response.hash);
        const receipt = await response.wait();
        console.log('Tx validated', receipt.transactionHash);
    }
}
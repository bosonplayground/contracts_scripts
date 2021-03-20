import { ethers } from 'ethers';
import { Web3Contract } from "../web3/web3.contract";
import abi from '../../abis/Cashier.json';

export class Cashier extends Web3Contract {
    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, abi.abi, signerOrProvider);
    }

    public async readOtherContracts() {
        const bosonRouterAddress = await this.contract.bosonRouterAddress();
        console.log('Cashier.bosonRouterAddress', bosonRouterAddress);
        const voucherKernel = await this.contract.voucherKernel();
        console.log('Cashier.voucherKernel', voucherKernel)
    }


}
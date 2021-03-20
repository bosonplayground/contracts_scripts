import { ethers } from 'ethers';
import { Web3Contract } from "../web3/web3.contract";
import abi from '../../abis/VoucherKernel.json';

export class VoucherKernel extends Web3Contract {
    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, abi.abi, signerOrProvider);
    }

    public async readOtherContracts() {
        const bosonRouterAddress = await this.contract.bosonRouterAddress();
        console.log('VoucherKernel.bosonRouterAddress', bosonRouterAddress);
        const cashierAddress = await this.contract.cashierAddress();
        console.log('VoucherKernel.cashierAddress', cashierAddress)
    }

}
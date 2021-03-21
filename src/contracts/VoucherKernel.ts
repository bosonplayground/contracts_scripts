import { BigNumber, ethers } from 'ethers';
import { Web3Contract } from "../web3/web3.contract";
import abi from '../../abis/VoucherKernel.json';

export class VoucherKernel extends Web3Contract {

    lastTokenIdVoucher: ethers.BigNumber | undefined;
    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, abi.abi, signerOrProvider);
        this.contract.on('LogVoucherDelivered', this.onLogVoucherDelivered);
    }

    public async readOtherContracts() {
        const bosonRouterAddress = await this.contract.bosonRouterAddress();
        console.log('VoucherKernel.bosonRouterAddress', bosonRouterAddress);
        const cashierAddress = await this.contract.cashierAddress();
        console.log('VoucherKernel.cashierAddress', cashierAddress)
    }

    public async getPromiseKey(idx: ethers.BigNumber): Promise<any> {
        return this.contract.getPromiseKey(idx);
    }

    public getTokenSupplyIdFromPromise(key: string): Promise<ethers.BigNumber> {
        return new Promise<ethers.BigNumber>((resolve, reject) => {
            this.contract.promises(key).then((promiseData: any[]) => {
                const idx = promiseData[1];
                const idxplus = idx.mul(ethers.BigNumber.from(2).pow(128)).add(ethers.BigNumber.from(2).pow(255));
                resolve(idxplus);
            }).catch(reject);
        });
    }

    public async typeId(): Promise<ethers.BigNumber> {
        return this.contract.typeId();
    }

    onLogVoucherDelivered(
        tokenIdSupply: ethers.BigNumber,
        tokenIdVoucher: ethers.BigNumber,
        issuer: string,
        holder: string,
        promiseId: string,
        correlationId: ethers.BigNumber
    ) {
        console.log('VoucherKernel.onLogVoucherDelivered', tokenIdSupply.toString(), tokenIdVoucher.toString(), promiseId);
        this.lastTokenIdVoucher = tokenIdVoucher;
    }


}
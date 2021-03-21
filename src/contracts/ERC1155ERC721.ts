import { BigNumber, ethers } from 'ethers';
import { Web3Contract } from "../web3/web3.contract";
import abi from '../../abis/ERC1155ERC721.json';

export class ERC1155ERC721 extends Web3Contract {
    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, abi.abi, signerOrProvider);
        this.contract.on('Transfer', this.onTransfer);
    }

    onTransfer = (from: string, to: string, tokenId: BigNumber) => {
        console.log('ERC1155ERC721.onTransfer', 'from', from, 'to', to, 'tokenId', tokenId.toString());
    }

    public async safeTransferFrom(from: string, to: string, tokenId: BigNumber): Promise<ethers.providers.TransactionReceipt> {
        const response = await this.contract['safeTransferFrom(address,address,uint256)'](from, to, tokenId);
        console.log('Tx sent', response.hash);
        const receipt = await response.wait();
        console.log('Tx validated', receipt.transactionHash);
        return receipt;
    }

    public async transferFrom(from: string, to: string, tokenId: BigNumber): Promise<ethers.providers.TransactionReceipt> {
        const response = await this.contract['transferFrom(address,address,uint256)'](from, to, tokenId);
        console.log('Tx sent', response.hash);
        const receipt = await response.wait();
        console.log('Tx validated', receipt.transactionHash);
        return receipt;
    }

    public async name(): Promise<string> {
        return this.contract.name();
    }

    public async symbol(): Promise<string> {
        return this.contract.symbol();
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return this.contract['balanceOf(address)'](owner);
    }

    public async ownerOf(tokenId: BigNumber): Promise<string> {
        return this.contract.ownerOf(tokenId);
    }



}
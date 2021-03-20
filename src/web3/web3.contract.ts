import { ethers } from 'ethers';

export abstract class Web3Contract {
    protected contract: ethers.Contract;
    constructor(
      address: string,
      abi: ethers.ContractInterface,
      signerOrProvider: ethers.Signer | ethers.providers.Provider
    ) {
      this.contract = new ethers.Contract(address, abi, signerOrProvider);
    }
    public on(eventName: string, callback: (...args: any[]) => void) {
      this.contract.on(eventName, callback);
    }
    public async deployed(): Promise<Web3Contract> {
      await this.contract.deployed();
      return this;
    }
  }
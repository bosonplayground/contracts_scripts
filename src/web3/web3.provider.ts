import { ContractInterface, ethers } from 'ethers';

export interface INetwork {
    name: string;
    chainId: number;
    nodeUrl: string;
    wssUrl: string;
}

function getBalanceAsNumber(
    bn: ethers.BigNumber,
    decimals: number,
    accuracy: number
): number {
    const r1 = ethers.BigNumber.from(10).pow(decimals - accuracy);
    const r2 = bn.div(r1);
    const r3 = r2.toNumber();
    const r4 = r3 / 10 ** accuracy;
    return r4;
}

export class Web3Provider {
    private _provider: ethers.providers.JsonRpcProvider;
    private _wallet: ethers.Wallet;
    private _contracts: {};

    public constructor(private _network: INetwork) {
        this._provider = new ethers.providers.StaticJsonRpcProvider(
            {
                // timeout: 180000,
                url: _network.nodeUrl,
            },
            _network
        );
        this._wallet = ethers.Wallet.fromMnemonic(
            process.env.MNEMONIC as string
        ).connect(this._provider);
        console.log('wallet', this._wallet.address);
        this._wallet.getBalance().then((balance: ethers.BigNumber) => {
            console.log('current balance:', getBalanceAsNumber(balance, 18, 4));
        });
        this._contracts = this.createContracts();
    }

    public get network(): INetwork {
        return this._network;
    }

    public async getCurrentAccount(): Promise<string> {
        return this._wallet.address;
    }

    public get contracts():  {} {
        return this._contracts;
    }

    private createContracts(): {} {
        return {
            // contract1: new Contract1(config().contracts['contract1'].addresses[this.network.chainId], this._wallet), // read-write
            // contract2: new Contract2(config().contracts['contract2'].addresses[this.network.chainId], this._provider), // read-only
        };
    }


}

import { ERC1155ERC721 } from './../contracts/ERC1155ERC721';
import { Cashier } from './../contracts/Cashier';
import { VoucherKernel } from './../contracts/VoucherKernel';
import { BosonRouter } from './../contracts/BosonRouter';
import { ContractInterface, ethers } from 'ethers';
import { config } from '../config';

export interface INetwork {
    name: string;
    chainId: number;
    nodeUrl: string;
    wssUrl: string;
}

export interface IContracts {
    bsnRouter: BosonRouter;
    voucherKernel: VoucherKernel;
    cashier: Cashier;
    erc1155721: ERC1155ERC721;
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
    private _contracts: IContracts;

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

    public get contracts(): IContracts {
        return this._contracts;
    }

    private createContracts(): IContracts {
        return {
            bsnRouter: new BosonRouter(config().contracts['bsnRouter'][this.network.chainId], this._wallet),
            voucherKernel: new VoucherKernel(config().contracts['voucherKernel'][this.network.chainId], this._wallet),
            cashier: new Cashier(config().contracts['cashier'][this.network.chainId], this._wallet),
            erc1155721: new ERC1155ERC721(config().contracts['erc1155721'][this.network.chainId], this._wallet),
            // contract1: new Contract1(config().contracts['contract1'].addresses[this.network.chainId], this._wallet), // read-write
            // contract2: new Contract2(config().contracts['contract2'].addresses[this.network.chainId], this._provider), // read-only
        };
    }


}

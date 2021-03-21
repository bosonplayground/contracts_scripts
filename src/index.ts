import { BosonRouter } from './contracts/BosonRouter';
import { Web3Provider } from './web3/web3.provider';
import { ApiServer } from './server';
import { getMessage } from './message';
import { TestController } from './api.controllers/testController';
import { RootController } from './api.controllers/rootController';
import { parse } from 'ts-command-line-args';
import { exit } from 'process';
import { config } from './config';
import { ethers } from 'ethers';

interface ICLArguments {
    network: string;
}

const args = parse<ICLArguments>(
    {
      network: {
        defaultValue: process.env.BLOCKCHAIN_NETWORK || 'ganache',
        type: String,
      },
    },
    {
      partial: true,
    }
  );

const main = async () => {

    const network = config().networks[args.network];
    const web3Provider = new Web3Provider(network)

    console.log(getMessage());

    await web3Provider.contracts.voucherKernel.readOtherContracts();

    await web3Provider.contracts.cashier.readOtherContracts();

    const nbOffers = await web3Provider.contracts.voucherKernel.typeId();
    console.log('nbOffers', nbOffers.toString());

    if (nbOffers.eq(0)) {
      await web3Provider.contracts.bsnRouter.createOrder();
      const nbOffers2 = await web3Provider.contracts.voucherKernel.typeId();
      console.log('nbOffers', nbOffers2.toString());
    }

    let tokenSupplyId;
    for (let i = 0; i < nbOffers.toNumber(); i++) {
      await web3Provider.contracts.voucherKernel.getPromiseKey(ethers.BigNumber.from(i)).catch((e) => {
        console.error(e);
      }).then(async (key) => {
        console.log('key #' + i, key);
        tokenSupplyId = await web3Provider.contracts.voucherKernel.getTokenSupplyIdFromPromise(key);
        console.log('--> id:', tokenSupplyId.toString());
      })
    }

    const seller = await web3Provider.getCurrentAccount();

    if (tokenSupplyId) {
      await web3Provider.contracts.bsnRouter.requestVoucher(tokenSupplyId, seller);
    }

    // const rootController = new RootController();
    // const testController = new TestController();

    // const server = new ApiServer([rootController, testController]);
    // server.start();

    await new Promise<void>((resolve, reject) => {setTimeout(() => {resolve();}, 15000)}); // wait a few seconds
}

main().then(() => {
    exit(0);
  }).catch(e => {
    console.error(e);
    exit(1);
  });
    
import { Web3Provider } from './web3/web3.provider';
import { ApiServer } from './server';
import { getMessage } from './message';
import { TestController } from './api.controllers/testController';
import { RootController } from './api.controllers/rootController';
import { parse } from 'ts-command-line-args';
import { exit } from 'process';
import { config } from './config';

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

    const rootController = new RootController();
    const testController = new TestController();

    const server = new ApiServer([rootController, testController]);
    server.start();

    await new Promise<void>((resolve, reject) => {}); // wait indefinitely
}

main().then(() => {
    exit(0);
  }).catch(e => {
    console.error(e);
    exit(1);
  });
    
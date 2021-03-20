import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
const res = dotenvConfig({
    debug: false,
    path: resolve(__dirname, './../.env'),
});
if (res.error) {
    throw res.error;
}

if (!process.env.APP_ID) {
    throw new Error(`Variable 'APPID' is not defined in running environment`);
}

if (!process.env.API_PORT) {
    throw new Error(`Variable 'API_PORT' is not defined in running environment`);
}

if (!process.env.MNEMONIC) {
    throw new Error('Please set your MNEMONIC in a .env file');
}

if (!process.env.INFURA_API_KEY) {
    throw new Error('Please set your INFURA_API_KEY in a .env file');
}

if (!process.env.MATICVIGIL_API_KEY) {
    throw new Error('Please set your MATICVIGIL_API_KEY in a .env file');
}
  
export const config = (): any => {
    return {
        APP_ID: process.env.APP_ID,
        API_PORT: process.env.API_PORT,
        networks: {
            ganache: {
              chainId: 1337,
              name: 'local (Ganache)',
              nodeUrl: `http://127.0.0.1:8545`,
              portisId: 'unknown',
              wssUrl: 'ws://127.0.0.1:8545',
            },
            ganache_docker: {
              chainId: 1337,
              name: 'local (Ganache)',
              nodeUrl: `http://host.docker.internal:7545`,
              portisId: 'unknown',
              wssUrl: 'ws://host.docker.internal:7545',
            },
            goerli: {
                chainId: 5,
                name: 'goerli',
                nodeUrl: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
                wssUrl: `wss://goerli.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
            },
            matic: {
              chainId: 137,
              name: 'MATIC',
              // nodeUrl: 'https://rpc-mumbai.maticvigil.com',
              nodeUrl: `https://rpc-mainnet.maticvigil.com/v1/${process.env.MATICVIGIL_API_KEY}`,
              portisId: 'matic',
              wssUrl: `wss://rpc-mainnet.maticvigil.com/ws/v1/${process.env.MATICVIGIL_API_KEY}`,
            },
            mumbai: {
              chainId: 80001,
              name: 'Mumbai',
              // nodeUrl: 'https://rpc-mumbai.matic.today',
              nodeUrl: `https://rpc-mumbai.maticvigil.com/v1/${process.env.MATICVIGIL_API_KEY}`,
              portisId: 'maticMumbai',
              // wssUrl: `wss://rpc-mumbai.maticvigil.com/ws/v1/${process.env.MATICVIGIL_API_KEY}`,
              wssUrl: `wss://ws-mumbai.matic.today`,
            },
        },
        contracts: {
            erc1155721: {
                4: 0x33F29C1e2F61Bb58226d79B4D8451509a899c06e,
                1337: 0x1763E3C5c4Cbd73D505eD485ae9Df2d61B1b3234,
            },
            voucherKernel: {
                4: 0xEfA361fD7cE0B1b409d23F119Fe6BA9e8c9328AF,
                1337: 0xa1d917b9a0981e65B97e918b7F4D19E981559eeD,
            },
            cashier: {
                4: 0x83a4BcdD650f67b7DbC92346B20e97fef660Ee20,
                1337: 0xB8BFb9CC6B31E2354185Fd685C81aCD2a8c843ab,
            },
            bsnRouter: {
                4: 0x4F5a26d7974EE27D8383EEa40FB0647897e680cE,
                1337: 0x19aAc979dc50758176A659b041c9D7d0129bb6AA,
            },
            bsnTokenPrice: {
                4: 0x200E5295fEC37B4410E6688a94de22C9d4C6DDbb,
                1337: 0x684F621eFf28DEdBa7819280063653ff933f5CC0,
            },
            bsnTokenDeposit: {
                4: 0x200E5295fEC37B4410E6688a94de22C9d4C6DDbb,
                1337: 0x684F621eFf28DEdBa7819280063653ff933f5CC0,
            }
        },
    };
}
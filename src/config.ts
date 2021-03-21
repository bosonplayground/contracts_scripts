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
            rinkeby: {
                chainId: 4,
                name: 'rinkeby',
                nodeUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
                wssUrl: `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
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
                4: '0xe8FF7C12477130D63F2D516308F3134eb9489bB9',
                1337: '0xeB232972c67390efbe822B487a862bff1EA8F9c3',
            },
            voucherKernel: {
                4: '0xF129ee2eAEe0a60e0695DCB5231A03f6fdaB1Da2',
                1337: '0x1A9305584B4b7dFfd0b035D8E6d5aDe693625d5E',
            },
            cashier: {
                4: '0x0Eb9eaF145aD0e0974fA0A8960Fa7de950330B50',
                1337: '0xa6dB613f2aEe291E2E701829b33D58e5467480b2',
            },
            bsnRouter: {
                4: '0xDB3bF0Bee5c0DE37D6C65c61012aAfea2Ce469e1',
                1337: '0x30d6883bd0c66bd3278eb4831321E901cbE02d65',
            },
            bsnTokenPrice: {
                4: '0x200E5295fEC37B4410E6688a94de22C9d4C6DDbb',
                1337: '0x684F621eFf28DEdBa7819280063653ff933f5CC0',
            },
            bsnTokenDeposit: {
                4: '0x200E5295fEC37B4410E6688a94de22C9d4C6DDbb',
                1337: '0x684F621eFf28DEdBa7819280063653ff933f5CC0',
            }
        },
    };
}
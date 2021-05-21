import {EnvironmentName} from './util/types';
import {config as dotenvConfig} from 'dotenv';
import {resolve} from 'path';

dotenvConfig({path: resolve(__dirname, '../.env')});
/**
 * Global DApp Config
 */

const {
  REACT_APP_DAO_REGISTRY_CONTRACT_ADDRESS,
  REACT_APP_DEFAULT_CHAIN_NAME_LOCAL,
  REACT_APP_ENVIRONMENT,
  REACT_APP_GRAPH_API_URL,
  REACT_APP_INFURA_PROJECT_ID_DEV,
  REACT_APP_INFURA_PROJECT_ID_LOCAL,
  REACT_APP_INFURA_PROJECT_ID_PROD,
  REACT_APP_MULTICALL_CONTRACT_ADDRESS,
  REACT_APP_SNAPSHOT_HUB_API_URL,
  REACT_APP_COUPON_API_URL,
  REACT_APP_SNAPSHOT_SPACE,
} = process.env;

export const ENVIRONMENT = REACT_APP_ENVIRONMENT as EnvironmentName | undefined;

/**
 * SNAPSHOT_HUB_API_URL
 *
 * @note For `ENVIRONMENT=localhost` we need to use CRA's local proxy
 *   so that we can communicate with our develop Snapshot Hub API
 *   without any CORS issues.
 *
 * @see src/setupProxy.js
 */
export const SNAPSHOT_HUB_API_URL: string | undefined =
  ENVIRONMENT === 'localhost'
    ? '/snapshot-hub'
    : REACT_APP_SNAPSHOT_HUB_API_URL;

export const COUPON_API_URL: string | undefined = REACT_APP_COUPON_API_URL;

// The Graph API URL
export const GRAPH_API_URL = REACT_APP_GRAPH_API_URL;

// Network IDs, when users change wallet networks
export const CHAINS = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  GANACHE: 1337,
};

// Network names for modal messaging
export const CHAIN_NAME = {
  [CHAINS.MAINNET]: 'Main Ethereum Network',
  [CHAINS.ROPSTEN]: 'Ropsten Test Network',
  [CHAINS.RINKEBY]: 'Rinkeby Test Network',
  [CHAINS.GOERLI]: 'Görli Test Network',
  [CHAINS.KOVAN]: 'Kovan Test Network',
  [CHAINS.GANACHE]: 'Ganache Test Network',
};

export const DEFAULT_CHAIN =
  REACT_APP_ENVIRONMENT === 'production'
    ? CHAINS.MAINNET
    : REACT_APP_ENVIRONMENT === 'development'
    ? CHAINS.RINKEBY
    : REACT_APP_DEFAULT_CHAIN_NAME_LOCAL // Set this to change local development chain
    ? CHAINS[REACT_APP_DEFAULT_CHAIN_NAME_LOCAL]
    : CHAINS.GANACHE; // Defaults to a Ganache private network (1337)

export const ETHERSCAN_URLS: {[chainId: number]: string} = {
  [CHAINS.MAINNET]: `https://etherscan.io`,
  [CHAINS.ROPSTEN]: `https://ropsten.etherscan.io`,
  [CHAINS.RINKEBY]: `https://rinkeby.etherscan.io`,
  [CHAINS.GOERLI]: `https://goerli.etherscan.io`,
  [CHAINS.KOVAN]: `https://kovan.etherscan.io`,
};

export const INFURA_WS_URLS: {[chainId: number]: string} = {
  [CHAINS.MAINNET]: `wss://mainnet.infura.io/ws/v3`,
  [CHAINS.ROPSTEN]: `wss://ropsten.infura.io/ws/v3`,
  [CHAINS.RINKEBY]: `wss://rinkeby.infura.io/ws/v3`,
  [CHAINS.GOERLI]: `wss://goerli.infura.io/ws/v3`,
  [CHAINS.KOVAN]: `wss://kovan.infura.io/ws/v3`,
};

// Infura Project Id
export const INFURA_PROJECT_ID =
  REACT_APP_ENVIRONMENT === 'production'
    ? REACT_APP_INFURA_PROJECT_ID_PROD
    : REACT_APP_ENVIRONMENT === 'development'
    ? REACT_APP_INFURA_PROJECT_ID_DEV
    : REACT_APP_INFURA_PROJECT_ID_LOCAL;

// Ethereum Provider URL
export const ETHEREUM_PROVIDER_URL: string = INFURA_WS_URLS[DEFAULT_CHAIN]
  ? `${INFURA_WS_URLS[DEFAULT_CHAIN]}/${INFURA_PROJECT_ID}`
  : DEFAULT_CHAIN === CHAINS.GANACHE
  ? /**
     * Ganache over WebSocket should work. @note Is not tested, yet.
     * Attempting to be consistent with a WebSocket URL to avoid more logic.
     *
     * @link https://www.trufflesuite.com/docs/truffle/reference/configuration#networks
     */
    'ws://127.0.0.1:7545'
  : '';

/**
 * CORE CONTRACTS
 * @note as per https://github.com/openlawteam/tribute-contracts#architecture
 *
 * - DAO Registry (@note uses dao address for the contract address)
 * - DAO Factory
 */

// If developing locally, include your DaoRegistry contract address in your `.env` file.
export const DAO_REGISTRY_CONTRACT_ADDRESS =
  REACT_APP_DAO_REGISTRY_CONTRACT_ADDRESS;

export const DAO_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0xA398aC29D32031a0EC6490Ac7760470e9bC039a8',
=======
  [CHAINS.RINKEBY]: '0x44D3cf6D9CDe25c39eA19a1456C0492FCF50c59a',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x060E56D4a0E7C4ad29630Fd5eA31b5Bfc3b53942',
};

export const BANK_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0xF1Ef2b6C271F0A20E16Ea9580acdE64A3942911A',
=======
  [CHAINS.RINKEBY]: '0xF1E6aB38bb64774e1A37DCF1ed1e6F674cdEaCaF',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xD7Ff02Bd1D71d107150EcC37890def2BDf5b774B',
};

// @todo
export const NFT_EXTENSION_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xF7Ff98599799C028fBabe0F10c6b2DEB7903a7A6',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x89481512195873F2bc9A44cDbdBee56b115500F2',
};

// @todo
export const NFT_COLLECTION_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x4d31230a5815c434d16C340c27cc6f71feb1DC85',
=======
  [CHAINS.RINKEBY]: '0x145Da47904cB4A678A47e29aA0e4eB9Ec511113E',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xD506A9f29F2Ea336007584A34c6c41d076F6972B',
};

// @todo
export const ERC20_TOKEN_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x7269aEC6B63a6609e6CFC5BdF86D3f5888eAfF3e',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x862d71d6E9Be8a7495EfEBa6f2b657b00E629c95',
};

/**
 * ADAPTER CONTRACTS
 * @note as per https://github.com/openlawteam/tribute-contracts#architecture
 *
 * - Configuration
 * - CouponOnboardingContract
 * - Managing
 * - Onboarding
 * - Voting
 * - Offchain voting
 * - Financing
 * - Tribute
 * - Distribute
 * - Rage quit
 * - Guild kick
 * - BankAdapter
 * - TributeNFT
 * - NFTAdapter
 * - DaoRegistryAdapter
 */

export const VOTING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x175608379E51472eBfF3BC7a9BD8e4D02E666785',
=======
  [CHAINS.RINKEBY]: '0xcc5883907573Bda72805a1967cdE1496f5F5D9c7',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x12A2A1b5C9E420BE119068Aa70bAB5289765BDDF',
};

export const CONFIGURATION_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0xaAbDc6c307B324e8B8A5C02094c5c68e78B61E46',
=======
  [CHAINS.RINKEBY]: '0x26062aA9E12978932baFbD5fD678De8f7E7DfEf0',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x9622da5EdF05e10D8B6e193c2C43D42F7654Ac1c',
};

export const RAGEQUIT_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0xda15581B42875326dBB828079239D104E438C54A',
=======
  [CHAINS.RINKEBY]: '0xE0abB21AD1e7130385fd682c891Eb548a6685173',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x3AaFBc96E93C8b9E5fE9176B35460D6395640626',
};

export const MANAGING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x99d564D9E21B1a76b384851963692DE230827542',
=======
  [CHAINS.RINKEBY]: '0xf13b60e8c013F949b512E2fd9D5712bf8ed978e2',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xDa9165E3a570Ed57492232F0aF83fe8eff9D20a1',
};

export const FINANCING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0xFF723B8Ad6343C16E1f9B23B1B4B2B8f521a7E95',
=======
  [CHAINS.RINKEBY]: '0xf25AD1C92f849cf382CBf1aef4252989F84c9c37',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x38ece17906D35793B11e49a2506a846C91c480d2',
};

export const ONBOARDING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x4288499fc0811728db835bb7d14101FaA1eC83Ec',
=======
  [CHAINS.RINKEBY]: '0xe3e2CBdc0638b1170972AdfB7A7dbb8591E912e6',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x4fA7c2E095b611aa11bdF6Ca9545f25D868c5A85',
};

export const GUILDKICK_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x4af40d68abd5cB41f4067bCDb6706Ae2A5357c91',
=======
  [CHAINS.RINKEBY]: '0x84c9A2d31C94702f97B83EF73D90a465391006FE',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x6807C1B0F9541f748606216b21C5Ea18891B216F',
};

export const DAO_REGISTRY_ADAPTER_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xafbDae2FcE86a92017bFc0D7AC7349777b853F0c',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x4d4243f2d605282CBd27C8391f05b77316d1a561',
};

export const BANK_ADAPTER_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x03F603D0A173538D1C1e7cb2778f414759f5Fd97',
=======
  [CHAINS.RINKEBY]: '0x1e1732DD781d8d783c69E268934c032817e53ea6',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xC3D0967c425d462bdBB940CeDE37C023Cfe688aE',
};

export const NFT_ADAPTER_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x48F11314569823EADBf8a43E7088E3C8688f398C',
=======
  [CHAINS.RINKEBY]: '0xBE4F2938590Cc3C9Bf4aB784E38abEd6fcaC0C4A',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x35D57222077d195DcB8aC118240Dde929DdFdA88',
};

export const COUPONONBOARDING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x30FE0BD1f903BDad67CE5617e785913A088ce992',
=======
  [CHAINS.RINKEBY]: '0x91bD4F0BAD0CEB21Cf2419c1e6c50c8AC901cd1D',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x891dF0b50E9aF014b49bc31D1b4aC23eAc355767',
};

export const TRIBUTE_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x0D39B7E537c8B6fB3F8F8B02B3E29FEE04f35567',
=======
  [CHAINS.RINKEBY]: '0xdce672449f9b5a2A061499033E9904683009840d',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xF7eeC0180AA335a77EA7F8a8602f446CfE450d75',
};

export const DISTRIBUTE_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0xe1f3D77cF5AE08020cd872774e8FD4F07549f714',
=======
  [CHAINS.RINKEBY]: '0x467C20f25D2Ed59a574c107a65656FdE0Ca0c2Ab',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x837d43CB797596d6FEE20cdeaA0b144CEFFe1F1E',
};

export const TRIBUTE_NFT_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x86106A23520C2D562E0d760852dC5163b7ae0d64',
=======
  [CHAINS.RINKEBY]: '0x30cC6fE6700Ff50A242bAF33dA3dc2122a88a6E0',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xc82e8B869985eaf27Bf334397E1a9613bEc2E9EF',
};

export const OFFCHAINVOTING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
<<<<<<< HEAD
  [CHAINS.RINKEBY]: '0x98D05acfc348498Abe44C44f37b970088B30082d',
=======
  [CHAINS.RINKEBY]: '0x4096545888a40890553bD734C71ed72683C7D5E6',
>>>>>>> 14f764729305a223d603b17969d98e1782d99f2a
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xd33Fa78291eF689007E596E5e27a3686F6eb7879',
};

// If developing locally, include your Multicall contract address in your `.env` file.
export const MULTICALL_CONTRACT_ADDRESS = REACT_APP_MULTICALL_CONTRACT_ADDRESS;

/**
 * These addresses are important as the contracts use them in their configs.
 *
 * @todo Remove and get from the chain/subgraph?
 *
 * @see https://github.com/openlawteam/tribute-contracts/blob/9e0e03616a00e41e666351e146ee109b9fe37fb2/utils/DaoFactory.js
 */
export const GUILD_ADDRESS: string =
  '0x000000000000000000000000000000000000dead';
export const TOTAL_ADDRESS: string =
  '0x000000000000000000000000000000000000babe';
export const UNITS_ADDRESS: string =
  '0x00000000000000000000000000000000000FF1CE';
export const LOOT_ADDRESS: string =
  '0x00000000000000000000000000000000B105F00D';
export const ETH_TOKEN_ADDRESS: string =
  '0x0000000000000000000000000000000000000000';
export const DAI_TOKEN_ADDRESS: string =
  '0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658';

/**
 * `SPACE` is used inside Snapshot Hub for matching a `space`
 * with its own proposals and votes.
 */
export const SPACE: string | undefined = REACT_APP_SNAPSHOT_SPACE;

/**
 * POLLING INTERVAL FOR GQL QUERIES
 * localhost | development - ms, poll every 5sec = 5000
 * production - ms, poll every 10sec = 10000
 */
export const GQL_QUERY_POLLING_INTERVAL: number =
  REACT_APP_ENVIRONMENT === 'production' ? 10000 : 5000;

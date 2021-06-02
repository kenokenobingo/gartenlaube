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
  [CHAINS.RINKEBY]: '0xb44feDAA82143E93262AFf4377Acd5E719e2836B',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x060E56D4a0E7C4ad29630Fd5eA31b5Bfc3b53942',
};

export const BANK_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x152BEe946Ee89c6a54d3F5e4A224EB3E2A4CB4cA',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xD7Ff02Bd1D71d107150EcC37890def2BDf5b774B',
};

// @todo
export const NFT_EXTENSION_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xE6281B58e25d34b5F8c421913266560Af7B44AB8',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x89481512195873F2bc9A44cDbdBee56b115500F2',
};

// @todo
export const NFT_COLLECTION_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x213811B14d672501e3e93b7A476265F330c143e7',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xD506A9f29F2Ea336007584A34c6c41d076F6972B',
};

// @todo
export const ERC20_TOKEN_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x993ad783CF48cBa91e08f52d9cfc796a361b59FA',
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
  [CHAINS.RINKEBY]: '0x83b4a53Bf561eDf6939fEebf8486EFE9ae911C76',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x12A2A1b5C9E420BE119068Aa70bAB5289765BDDF',
};

export const CONFIGURATION_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xF23b8e110e22735AA27096C19c3564E9be3FB889',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x9622da5EdF05e10D8B6e193c2C43D42F7654Ac1c',
};

export const RAGEQUIT_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x57Fb9674c747d9F2937AC81415C0fAfDEaf4bD54',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x3AaFBc96E93C8b9E5fE9176B35460D6395640626',
};

export const MANAGING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xfC288d4B816f33Dc93Acb6b2Ce326976e98d5edC',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xDa9165E3a570Ed57492232F0aF83fe8eff9D20a1',
};

export const FINANCING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xA569aDE4C6ae960B2864F36fF4c9f0e26fAe57cD',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x38ece17906D35793B11e49a2506a846C91c480d2',
};

export const ONBOARDING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xb16cffbe437291934f4dAB9DcE0377d0AB105402',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x4fA7c2E095b611aa11bdF6Ca9545f25D868c5A85',
};

export const GUILDKICK_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x20F96aa31599f77eB64062844e3b7b116479D572',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x6807C1B0F9541f748606216b21C5Ea18891B216F',
};

export const DAO_REGISTRY_ADAPTER_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xDF2075726Acc46e7bF4EAF9a5f5b9fB4883F8932',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x4d4243f2d605282CBd27C8391f05b77316d1a561',
};

export const BANK_ADAPTER_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x4f34f486CC6f1863ec47a6c1B97e8a8F667f2389',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xC3D0967c425d462bdBB940CeDE37C023Cfe688aE',
};

export const NFT_ADAPTER_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x112271D3227b53311d3Aa3095AA29692CfF251c7',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x35D57222077d195DcB8aC118240Dde929DdFdA88',
};

export const COUPONONBOARDING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x9197E02a30507AD8308bc1dFE5Ff142BE15a20a1',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x891dF0b50E9aF014b49bc31D1b4aC23eAc355767',
};

export const TRIBUTE_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x1ECf9512839c7Fa1dB822e4468ad58d8A690eF4d',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xF7eeC0180AA335a77EA7F8a8602f446CfE450d75',
};

export const DISTRIBUTE_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x11135940eE18e5e0378A315C1e74aF4C32913C3C',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x837d43CB797596d6FEE20cdeaA0b144CEFFe1F1E',
};

export const TRIBUTE_NFT_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x61a711C93d0dCFb73B955F1e6cAb577B53ab5A51',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xc82e8B869985eaf27Bf334397E1a9613bEc2E9EF',
};

export const OFFCHAINVOTING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xaC3c8b8940Ef4df5595dB2e8CCd60F2fC700457F',
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
export const MEMBER_COUNT_ADDRESS: string =
  '0x00000000000000000000000000000000DECAFBAD';
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

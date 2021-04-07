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
 * @note as per https://github.com/openlawteam/molochv3-contracts#architecture
 *
 * - DAO Registry (@note uses dao address for the contract address)
 * - DAO Factory
 */

// If developing locally, include your DaoRegistry contract address in your `.env` file.
export const DAO_REGISTRY_CONTRACT_ADDRESS = REACT_APP_DAO_REGISTRY_CONTRACT_ADDRESS;

export const DAO_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x10a14A1665DE72faeDb866Fc75c57036813E2Eb2',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x6Adf64C217E65474D32E44c610e2ED7967a504eB',
};

export const BANK_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x439b0e754B9d2713C56af3A4AB839D4016233D27',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x8d223E2026581C51C12BA048862C969cc9B5aE3e',
};

// @todo
export const NFT_EXTENSION_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x03DaAEf82C5D65479A978e41ea4Fe0B5592d61Be',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xB7051B02002eD2bfD3C03414AA6F692dC76cB9B4',
};

// @todo
export const NFT_COLLECTION_FACTORY_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xc0f00Ab8821A22E2E6Da515b7C5CF8FCa55b8443',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xB8D74f9B29B2B0c244BD44a377db06221a2b067d',
};

/**
 * ADAPTER CONTRACTS
 * @note as per https://github.com/openlawteam/molochv3-contracts#architecture
 *
 * - Configuration
 * - CouponOnboardingContract @todo add to initContracts
 * - Managing
 * - Onboarding
 * - Voting
 * - Offchain voting
 * - Financing
 * - Tribute
 * - Distribute
 * - Rage quit
 * - Guild kick
 * - Withdraw
 */

export const VOTING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xC70C40B50a55D9dA1Fa213A5a7CD9d2Be4110308',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x3a872aCA2F20620a8b1D3bE1Cf3b9962bE861471',
};

export const CONFIGURATION_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x249BBe23d162B9128d341AeD410709eCA48C71E6',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xB1D18680039A63aa6d25EB158a161b97574E4FDA',
};

export const RAGEQUIT_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xaC9aE075e62f97dBBf99550Af92b88fcBb51D383',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x65E76C2ac64877FCc02fe7AB979a850C5b4EAe06',
};

export const MANAGING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xAa90fD2eEfBa76391CcF7A0a0323714c37E781E5',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x90485D22B3089bC6e896dc03db18dF8a68fc1C37',
};

export const FINANCING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x1EC2AfD315dFADd5B959Ae559bb87950fddAD4A1',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x146Ec565CC1Ccf104D2c381BBfBF7FDAb4825894',
};

export const ONBOARDING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xd95530A2de666E6047158903af9F0d159871212b',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x5f5cBd0a2ae7c36749F096CADE6bc61B2240064F',
};

export const GUILDKICK_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x57E98bA82960e61f683B94756Df2567f6aaB80A0',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xc8b94888EB3009bcdCc38C4DB78013F4BDe1cB5B',
};

export const WITHDRAW_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x0B24B4557cD426c9F84a19C94Aa910e002215104',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x468814e84B2d841b0aF2CdF269Dca5Ca67AfC9eB',
};

export const COUPONONBOARDING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0xeF7468dCeE1da88272d09d4028c77C481e42E5CD',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x28Bda632Af0B0c84AB4d0e6022CfB2668bD672a2',
};

export const TRIBUTE_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x980b7D59Dd1dF3565Fe877915F1a5C5C5D4FAE95',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xb4FA04838979aBb047b100C2DeD1B12a0B1742bF',
};

export const DISTRIBUTE_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x450Be9991fF6281b7F0A71dD3EF01846d7E556a1',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x6Cb67E513D1c5a661A973E140FFb63357EEA4Ab7',
};

export const TRIBUTE_NFT_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x6Ade5FC897b3D04ae1902bFB9E1b95A9d9dbd043',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0xded31545594d867F54FbC725F75621E2BB3d50cd',
};

export const OFFCHAINVOTING_CONTRACT_ADDRESS = {
  [CHAINS.MAINNET]: '',
  [CHAINS.ROPSTEN]: '',
  [CHAINS.RINKEBY]: '0x2b80cD2C4B99d9c0E6482b5C762540df85179dc9',
  [CHAINS.GOERLI]: '',
  [CHAINS.KOVAN]: '',
  [CHAINS.GANACHE]: '0x9fd2cf3442EB6d1BE00D29202DDad9848bBBDdB5',
};

// If developing locally, include your Multicall contract address in your `.env` file.
export const MULTICALL_CONTRACT_ADDRESS = REACT_APP_MULTICALL_CONTRACT_ADDRESS;

/**
 * These addresses are important as the contracts use them in their configs.
 *
 * @todo Remove and get from the chain/subgraph?
 *
 * @see https://github.com/openlawteam/molochv3-contracts/blob/9e0e03616a00e41e666351e146ee109b9fe37fb2/utils/DaoFactory.js
 */
export const GUILD_ADDRESS: string =
  '0x000000000000000000000000000000000000dead';
export const TOTAL_ADDRESS: string =
  '0x000000000000000000000000000000000000babe';
export const SHARES_ADDRESS: string =
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

import Web3 from 'web3';
import { AbiExamples } from '../abi-examples';

const web3 = new Web3(
  'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
);

const contract = new web3.eth.Contract(
  AbiExamples.factoryAbi as any,
  AbiExamples.factoryAddress
);

console.log(contract);

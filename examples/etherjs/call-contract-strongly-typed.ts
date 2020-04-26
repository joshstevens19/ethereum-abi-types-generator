import { ethers } from 'ethers';
import { FactoryAbi } from '../../abi-types-generator/abi-examples/factory';
import { EthersContractContext } from '../../abi-types-generator/src/typescript/ethers-contract-context';
import { AbiExamples } from '../abi-examples';

// Connect to the network
let customHttpProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
);

const example = async () => {
  // We connect to the Contract using a Provider, so we will only
  // have read-only access to the Contract
  let contract = new ethers.Contract(
    AbiExamples.factoryAddress,
    AbiExamples.factoryAbi,
    customHttpProvider
  ) as EthersContractContext<FactoryAbi>;

  const exchange = await contract.getExchange(
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b'
  );

  console.log(exchange);
};

example();

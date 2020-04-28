import Web3 from 'web3';
import {
  FactoryAbi,
  FactoryAbiEvents,
  FactoryAbiEventsContext,
  FactoryAbiMethodNames,
} from '../../abi-types-generator/abi-examples/factory';
import { Web3ContractContext } from '../../abi-types-generator/src/converters/typescript/contexts/web3-contract-context';
import { AbiExamples } from '../abi-examples';

const example = async () => {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
  );

  const contract = (new web3.eth.Contract(
    AbiExamples.factoryAbi as any,
    AbiExamples.factoryAddress
  ) as unknown) as Web3ContractContext<
    FactoryAbi,
    FactoryAbiMethodNames,
    FactoryAbiEventsContext,
    FactoryAbiEvents
  >;

  const exchange = await contract.methods
    .getExchange('0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b')
    .call();

  contract.events.NewExchange({ filter: { token: 'hey' } });

  console.log(exchange);
};

example();

import { EventData } from 'ethereum-abi-types-generator';
import Web3 from 'web3';
import { AbiExamples } from '../abi-examples';
import { ContractContext } from './generated-typings/factory';

const example = async () => {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
  );

  const contract = (new web3.eth.Contract(
    AbiExamples.factoryAbi as any,
    AbiExamples.factoryAddress
  ) as unknown) as ContractContext;

  const exchange = await contract.methods
    .getExchange('0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b')
    .call();

  const hey = await contract.methods
    .initializeFactory('123')
    .send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' })
    .on('transactionHash', (hash: string) => {});

  contract.events
    .NewExchange({ filter: { token: 'hey' } })
    .on('data', (data: EventData) => {});

  console.log(exchange);
};

example();

import Web3 from 'web3';
import { AbiExamples } from '../abi-examples';
import {
  ContractContext,
  TupleInputOnlyRequest,
  TupleNoInputNamesResponse,
} from './generated-typings/fake-contract';

const example = async () => {
  const mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

  const web3 = new Web3(
    'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
  );

  // Has to cast to unknown as we have made some typings changes to the
  // contract interfaces which conflicts with `web3` typings.
  // This all work great but the compiler gets confused.
  // Casting to unknown first then the `ContractContext` solves this.
  const contract = (new web3.eth.Contract(
    AbiExamples.YOUR_ABI as any,
    AbiExamples.YOUR_CONTRACT_ADDRESS
  ) as unknown) as ContractContext;

  // you now have full typings on `contract.methods` which has generated docs
  const simpleCall = await contract.methods
    .easyExample(true, mockEthereumAddress, new Date().getTime())
    .call();

  console.log(simpleCall);

  // build up a proper typed request object with the interface importable
  // from the typings file generated
  const tupleExampleRequest: TupleInputOnlyRequest = {
    address: mockEthereumAddress,
    timestamps: [
      new Date().getTime(),
      new Date().getTime(),
      new Date().getTime(),
    ],
  };

  // encode abi method all exposed
  const data = contract.methods.tupleInputOnly(tupleExampleRequest).encodeABI();
  console.log(data);

  // any none constant methods will have the correct interface on them as well
  // aka you cant call `.call()` here and the compile will show you this.
  // will also expose the event emitters for your typings to still work with web3
  contract.methods
    .tupleInputOnly(tupleExampleRequest)
    .send({ from: mockEthereumAddress })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });

  const result: TupleNoInputNamesResponse = await contract.methods
    .tupleNoInputNames(mockEthereumAddress, mockEthereumAddress)
    .call();

  console.log(result);

  // full typings on your events with even the filter indexs which will
  // not compile if supply it incorrectly and only expose the correct ones for you
  contract.events
    .Event1({ filter: { token: '0x00' } })
    .on('changed', (event) => {
      console.log(event);
    });

  // can any past events only allowing you to query events which actually exist
  const event = await contract.getPastEvents('Event1', {
    filter: { token: '0x00' },
  });

  console.log(event);
};

example();

import { ethers } from 'ethers';
import { EthersContractContext } from '../../abi-types-generator/src/converters/typescript/contexts/ethers-contract-context';
import { AbiExamples } from '../abi-examples';
import {
  UniswapFactoryAbi,
  UniswapFactoryAbiEvents,
  UniswapFactoryAbiEventsContext,
} from './generated-typings/factory';

// Connect to the network
let customHttpProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
);

const example = async () => {
  // We connect to the Contract using a Provider, so we will only
  // have read-only access to the Contract
  let contract = (new ethers.Contract(
    AbiExamples.factoryAddress,
    AbiExamples.factoryAbi,
    customHttpProvider
  ) as unknown) as EthersContractContext<
    UniswapFactoryAbi,
    UniswapFactoryAbiEventsContext,
    UniswapFactoryAbiEvents
  >;

  const exchange = await contract.getExchange(
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b'
  );

  console.log(exchange);

  // let privateKey =
  //   '0x0123456789012345678901234567890123456789012345678901234567890123';
  // let wallet = new ethers.Wallet(privateKey, customHttpProvider);

  // // Create a new instance of the Contract with a Signer, which allows
  // // update methods
  // let contractWithSigner = contract.connect(wallet);

  // const tx = await contractWithSigner.initializeFactory(
  //   '0x45Cd08334aeedd8a06265B2Ae302E3597d8fAA28'
  // );

  // console.log(tx);

  const hey = contract.on(
    UniswapFactoryAbiEvents.NewExchange,
    (author, oldValue, newValue, event) => {
      // Called when anyone changes the value

      console.log(author);
      // "0x14791697260E4c9A71f18484C9f997B308e59325"

      console.log(oldValue);
      // "Hello World"

      console.log(newValue);
      // "Ilike turtles."

      // See Event Emitter below for all properties on Event
      console.log(event.blockNumber);
      // 4115004
    }
  );

  console.log(
    await hey.getExchange('0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b')
  );

  // // let filter = contract.filters.NewExchange();

  // contract.on(filter, (author, oldValue, newValue, event) => {
  //   // Called ONLY when your account changes the value
  // });

  // console.log(contract.functions);
  // console.log(
  //   await contract.functions.getExchange(
  //     '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b'
  //   )
  // );
};

example();

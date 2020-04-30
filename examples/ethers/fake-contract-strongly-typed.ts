import { ethers } from 'ethers';
import { AbiExamples } from '../abi-examples';
import {
  ContractContext,
  TupleInputOnlyRequest,
  TupleNoInputNamesResponse,
} from './generated-typings/fake-contract';

const example = async () => {
  const mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

  // Connect to the network
  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
  );

  // Has to cast to unknown as we have made some typings changes to the
  // contract interfaces which conflicts with `ethers` typings.
  // This all work great but the compiler gets confused.
  // Casting to unknown first then the `ContractContext` solves this.
  const contract = (new ethers.Contract(
    AbiExamples.factoryAddress,
    AbiExamples.factoryAbi,
    customHttpProvider
  ) as unknown) as ContractContext;

  // you now have full typings on `contract.x` which has generated docs
  const simpleCall = await contract.easyExample(
    true,
    mockEthereumAddress,
    new Date().getTime()
  );

  console.log(simpleCall);

  // you can use the same etherjs flows to send and sign transactions
  // `contract.connect` will return a `ContractContext` so will still have
  // all the typings exposed for you
  const privateKey =
    '0x0123456789012345678901234567890123456789012345678901234567890123';
  const wallet = new ethers.Wallet(privateKey, customHttpProvider);

  // Create a new instance of the Contract with a Signer, which allows
  // update methods
  const contractWithSigner = contract.connect(wallet);

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

  const tx = await contractWithSigner.tupleInputOnly(tupleExampleRequest);
  console.log(tx.hash);
  // "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"

  // The operation is NOT complete yet; we must wait until it is mined
  await tx.wait();

  const result: TupleNoInputNamesResponse = await contract.tupleNoInputNames(
    mockEthereumAddress,
    mockEthereumAddress
  );

  console.log(result);

  // full typings on your events
  contract.on(
    'Event1',
    (author: string, oldValue: string, newValue: string, event: any) => {
      // Called when anyone changes the value

      console.log(author);
      // "0x14791697260E4c9A71f18484C9f997B308e59325"

      console.log(oldValue);
      // "Hello World"

      console.log(newValue);
      // "I like turtles."

      console.log(event.blockNumber);
      // 4115004
    }
  );

  // filter that matches my signer as the author
  const filter = contract.filters.Event1(wallet.address);

  // full typings on filter interfaces as well
  contract.filters.Event1(
    filter,
    (author: string, oldValue: string, newValue: string, event: any) => {
      // Called ONLY when your account changes the value

      console.log(author);
      // "0x14791697260E4c9A71f18484C9f997B308e59325"

      console.log(oldValue);
      // "Hello World"

      console.log(newValue);
      // "I like turtles."

      console.log(event.blockNumber);
      // 4115004
    }
  );
};

example();

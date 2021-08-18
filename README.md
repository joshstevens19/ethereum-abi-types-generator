[![npm version](https://badge.fury.io/js/ethereum-abi-types-generator.svg)](https://badge.fury.io/js/ethereum-abi-types-generator)
![downloads](https://img.shields.io/npm/dw/ethereum-abi-types-generator)

## ethereum-abi-types-generator

Dev typings for all your ethereum ABI contract methods and events with 1 liner integrations with `web3` and `ethers` 👏👏👏👏. Never have to have a runtime error again and bring them into compile time errors in 2 minutes.

<img src="./images/gif-demo.gif" />

A CLI tool which allows you to convert an ABI json file into fully loaded interfaces types.

## Features 🚀

🚀 Compile time errors, never make easy dynamic mistakes again.
<br/>
🚀 Easy 1 line solution to get working
<br/>
🚀 Use the same interfaces as the provider your use to, no changes in how you develop
<br/>
🚀 Works with just a simple ABI json file
<br/>
🚀 Supports `ethers` and `web3` out the box
<br/>
🚀 0 bundle increase, its all dev dependencies so get all the benefit with no negative impact on your build size
<br/>
🚀 Nice easy CLI to allow you to generate these however you like, build scripts, watch file change events its up to you
<br/>
🚀 Supported multidimensional return types aka `bytes32[4] >`[string, string, string, string, string]`
<br/>
🚀 Automatic documentation generated on each method outputting all the details about it which is on the ABI - no jumping back and forth

## Supports

- Web3 1.x and 2.x
- Ethers 5.x
- Ethers 4.x
- Hardhat

## ethereum-abi-types-generator vs TypeChain

The first question I normally get is “have you seen TypeChain”, yes I have of course and it is a great tool but it was missing and did a few things which I didn't want as a developer. The main differences with this ethereum-abi-types-generator vs typechain are:

### No bundle size at all added

With TypeChain you have a class factory you have to connect to adding size into the final bundle. This package is all interfaces meaning nothing is added to your final bundle size.

### Exposes proper typed interfaces meaning you can use them in your application

TypeChain has dynamic interfaces aka `public contractCall(): Promise<{ foo: BigNumber }>` so if you wanted to use that interface somewhere in your app its not exported so can not be used. This lib generates response interfaces which are exported aka:

```ts
export interface ContractCallResponse {
  foo: BigNumber
}

public contractCall(): Promise<ContractCallResponse>
```

This means you can use this interface anywhere in your app as its just exported for you. The naming for this is `${contractCallMethodName}Response` aka if a method was called HelloWorld the response interface would be `HelloWorldResponse`. This also follows suit on the request interfaces aka:

```ts
export interface FooRequest {
  foo: BigNumber,
  boo: string;
}

public contractCall(request: FooRequest): Promise<ContractCallResponse>
```

If you have worked with dynamic interfaces you understand the pain it brings having to recreate everytime.

### Use your provider interface your use too

TypeChain you have to connect to the factory then use the contract that way. With this lib you just use web3 or ethers interface for every contract call meaning you don't have to get use to another process it just works and zero code changes just cast and you got compile time errors for contracts.

## Motivation

Blockchain development in JavaScript is already super hard. You have all these tools like `truffle,` `ethers`, `web3` (the list goes on) which you have to get use to and the learning curve is already quite high. On top of this, you have loads of other tools to get things to work as you need. TypeScript allows you to bring runtime errors in the compiler but on contract calls most developers have to either build their own types meaning maintaining them and easily getting out of sync or have no compile type errors using the dreaded `any` hoping and praying you don't break anything. The idea was to not have to make the developer wrap any kind of `web3` or `ethers` instance or use a new tool to get this working but with a simple 1 line change you can use all the same libraries interfaces as what the developer is use to but with `types` `auto-generated` for you to bring back compile-time errors on any contract calls with super ease.

The ABI file is the source of truth for all contract calls so by building types from this file we can be assured our types correct.

## Installation

### npm:

```js
$ npm install ethereum-abi-types-generator --save-dev
```

### yarn:

```js
$ yarn add ethereum-abi-types-generator --dev
```

You can install this globally as well but you **must** make sure wherever the `--output` location is which generates the typings file has `ethereum-abi-types-generator` installed in that project, as it uses imports from this package to map the `ContractContext` to make your life easier handling the generic type build up automatically. We suggest always running this tool inside a project context.

## Tsconfig compile time issues

If you get compile time errors due to it waiting `web3` dependencies when using ethers please set `skipLibCheck`: true in the tsconfig.json compiler options and this should fix that issue.

## CLI usage

### Web3 1.x and 2.x & Ethers 5.x & Ethers 4.x

```ts
$ abi-types-generator <abiFileLocation>
$ abi-types-generator <abiFileLocation> --name=ABI_NAME
$ abi-types-generator <abiFileLocation> --watch
$ abi-types-generator <abiFileLocation> --name=ABI_NAME --watch
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --watch
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --watch
$ abi-types-generator <abiFileLocation> --provider=web3|ethers|ethers_v5
$ abi-types-generator <abiFileLocation> --provider=web3|ethers|ethers_v5 --watch
$ abi-types-generator <abiFileLocation> --name=ABI_NAME --provider=web3|ethers|ethers_v5
$ abi-types-generator <abiFileLocation> --name=ABI_NAME --provider=web3|ethers|ethers_v5 --watch
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers|ethers_v5
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers|ethers_v5 --watch
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers|ethers_v5
$ abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers|ethers_v5 --watch
```

#### Hardhat

```ts
$ abi-types-generator hardhat
```

We suggest running these within the `script` commands in npm or yarn this way you will not lose your commands and can be run on build agents as well. Also you will not get confused with sharing the script and others running in the wrong paths. Examples below:

```json
{
  "name": "examples",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "web3-example": "abi-types-generator './abi-examples/fake-contract-abi.json' --output='./web3/fake-contract-example/generated-typings' --name=fake-contract",
    "web3-token-abi": "abi-types-generator './abi-examples/token-abi.json' --output='./web3/uniswap-example/generated-typings' --name=token-contract",
    "web3-uniswap-exchange-abi": "abi-types-generator './abi-examples/uniswap-exchange-abi.json' --output='./web3/uniswap-example/generated-typings' --name=uniswap-exchange-contract",
    "web3-uniswap-factory-abi": "abi-types-generator './abi-examples/uniswap-factory-abi.json' --output='./web3/uniswap-example/generated-typings' --name=uniswap-factory-contract",
    "web3-uniswap": "npm run web3-token-abi && npm run web3-uniswap-exchange-abi && npm run web3-uniswap-factory-abi",
    "ethers-example": "abi-types-generator './abi-examples/fake-contract-abi.json' --output='./ethers/fake-contract-example/generated-typings' --name=fake-contract --provider=ethers",
    "ethers-token-abi": "abi-types-generator './abi-examples/token-abi.json' --output='./ethers/uniswap-example/generated-typings' --name=token-contract --provider=ethers",
    "ethers-uniswap-exchange-abi": "abi-types-generator './abi-examples/uniswap-exchange-abi.json' --output='./ethers/uniswap-example/generated-typings' --name=uniswap-exchange-contract --provider=ethers",
    "ethers-uniswap-factory-abi": "abi-types-generator './abi-examples/uniswap-factory-abi.json' --output='./ethers/uniswap-example/generated-typings' --name=uniswap-factory-contract --provider=ethers",
    "ethers-uniswap": "npm run ethers-token-abi && npm run ethers-uniswap-exchange-abi && npm run ethers-uniswap-factory-abi",
    "ethers-v5-example": "abi-types-generator './abi-examples/fake-contract-abi.json' --output='./ethers_v5/fake-contract-example/generated-typings' --name=fake-contract --provider=ethers_v5",
    "ethers-v5-token-abi": "abi-types-generator './abi-examples/token-abi.json' --output='./ethers_v5/uniswap-example/generated-typings' --name=token-contract --provider=ethers_v5",
    "ethers-v5-uniswap-exchange-abi": "abi-types-generator './abi-examples/uniswap-exchange-abi.json' --output='./ethers_v5/uniswap-example/generated-typings' --name=uniswap-exchange-contract --provider=ethers_v5",
    "ethers-v5-uniswap-factory-abi": "abi-types-generator './abi-examples/uniswap-factory-abi.json' --output='./ethers_v5/uniswap-example/generated-typings' --name=uniswap-factory-contract --provider=ethers_v5",
    "ethers-v5-uniswap": "npm run ethers-token-abi && npm run ethers-uniswap-exchange-abi && npm run ethers-uniswap-factory-abi",
    "hardhat-example": "abi-types-generator hardhat"
  }
}
```

### Arguments

#### `<abiFileLocation>` \* required

The ABI json file path location. Must be a JSON file path.

### `--name=ABI_NAME`

The ABI ts file you want it to be named as, this will also name interface and enums as this. It will remove any `-` and `.` for the `ts` interfaces and enum names.

If not supplied it will take the file name and use that as the abi name throughout.

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json
```

generates: `./examples/abi-examples/uniswap-factory-abi.ts`

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --name=foo-abi
```

generates: `./examples/abi-examples/foo-abi.ts`

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --name=foo.abi
```

generates: `./examples/abi-examples/foo.abi.ts`

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --name=foo
```

generates: `./examples/abi-examples/foo.ts`

### `--output=PATH_DIRECTORY`

Where you want the `.ts` to be generated and saved to.

If not supplied it will use the directory of the `<abiFileLocation>` and generate it there.

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json
```

generates in: `./examples/abi-examples/uniswap-factory-abi.ts`

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --output=./examples/ethers/generated-typings
```

generates in: `./examples/ethers/generated-typings/uniswap-factory-abi.ts`

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --output=./examples/ethers/generated-typings --name=foo
```

generates: `./examples/ethers/generated-typings/foo.ts`

### `--provider=web3|ethers|ethers_v5`

What `contract` support you want to generate. This is the library you are using on your dapp and the lib you use to call any contract calls.

```ts
export enum Provider {
  web3 = 'web3',
  ethers = 'ethers',
  ethers_v5 = 'ethers_v5',
}
```

If not supplied it will fallback to `web3`

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json
```

generates the web3 contract typings based on the web3 lib.

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --provider=ethers
```

generates the ethers contract typings based on the ethers 4 lib.

Example:

```ts
$ abi-types-generator ./examples/abi-examples/uniswap-factory-abi.json --provider=ethers_v5
```

generates the ethers contract typings based on the ethers 5 lib.

### `--watch`

This will watch the `<abiFileLocation>` for changes and if anything does change it will regenerate the typings and resave them in the `--output` defined or use the default one if one is not defined.

### Formatting

We use `prettier` to format all files, to make sure it matches your coding style just make sure you have a `.prettierrc` defined in the root of your project and it will use that. If it can not find any it will take these default prettier:

```ts
{
    parser: 'typescript',
    trailingComma: 'es5',
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 80,
}
```

##### Running tslint as well

Right now the package does not try to find any of your `tslint.json` settings. It will support this soon. For now if you get any `tslint` errors when running the linter it's best to ignore any generated file in the `linterOptions` > `exclude` of the `tslint.json`. I tend to put all my generated files in 1 place so I can ignore the entire folder.

### Using with hardhat

First you create a script in your `package.json` that runs the `abi-types-generator` script after it compiles everytime.

```json
{
  "scripts": {
    "compile": "npx hardhat compile && abi-types-generator hardhat"
  }
}
```

If your contracts are ready to compile run:

```bash
$ npm run compile
```

You types are now created within the root of your hardhat project in a folder called `ethereum-abi-types` and you can use them throughout your tests/scripts or anything `ts` related.

### Test example

```ts
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ContractContext as MyVeryFirstContract,
  GetFooResponse,
  GetFooRequest,
} from '../ethereum-abi-types/MyVeryFirstContract';

describe('Example test', function () {
  let contract: NftMetadataHelper;
  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory(
      'MyVeryFirstContract'
    );

    // thats it you now have full typings on your contract
    contract =
      (await contractFactory.deploy()) as unknown as MyVeryFirstContract;
  });

  it('I love to write unit tests', async () => {
    const foo: GetFooRequest = { fooBoo: true };
    const result: GetFooResponse = await contract.getFoo(foo);

    expect(result).to.equal(
      { fooResponse: 'boo' }
  });
});
```

### Using with web3 and ethers

#### Web3 - https://www.npmjs.com/package/web3

#### Uniswap full example:

https://github.com/joshstevens19/ethereum-abi-types-generator/blob/master/examples/web3/uniswap-example/uniswap-contract-strongly-typed-example.ts

Below is just a fake contract example just so you can understand how the typings improve your development.

The cli tool will generate all your typings for you and expose them in the generated file. Its super easy to start using strongly typed interfaces for all your ABI calls.

Lets say i run the cli command:

```ts
$ abi-types-generator ./abi-examples/fake-contract-abi.json  --output=./generated-typings --name=fake-contract
```

This will generate an `ts` file of `./generated-typings/fake-contract.ts` which has all your strongly typed methods and events.

All you meed to do is cast your `new web3.eth.Contract` code to an `ContractContext` which is exposed in where you defined the `--output` path to. In this example it is `./generated-typings/fake-contract.ts`

#### Example:

```ts
import Web3 from 'web3';
import { AbiExamples } from '../../abi-examples';
import { ContractContext } from './generated-typings/fake-contract';

const web3 = new Web3(
  'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
);

// Has to cast to unknown as we have made some typings changes to the
// contract interfaces which conflicts with `web3` typings.
// This all work great but the compiler gets confused.
// Casting to unknown first then the `ContractContext` solves this.
const contract = new web3.eth.Contract(
  AbiExamples.YOUR_ABI,
  AbiExamples.YOUR_CONTRACT_ADDRESS
) as unknown as ContractContext;
```

Easy as that 🔥🔥

#### Full example:

```ts
import Web3 from 'web3';
import { AbiExamples } from '../../abi-examples';
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
  const contract = new web3.eth.Contract(
    AbiExamples.YOUR_ABI,
    AbiExamples.YOUR_CONTRACT_ADDRESS
  ) as unknown as ContractContext;

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
```

If the ABI changes and I run the CLI command again or have a --watch on the file, when you try to compile it will flag any errors with your typings for you.

### Ethers - https://www.npmjs.com/package/ethers

#### Uniswap full example:

https://github.com/joshstevens19/ethereum-abi-types-generator/blob/master/examples/ethers/uniswap-example/uniswap-contract-strongly-typed-example.ts

Below is just a fake contract example just so you can understand how the typings improve your development.

The cli tool will generate all your typings for you and expose them in the generated file. Its super easy to start using strongly typed interfaces for all your ABI calls.

Lets say i run the cli command:

Ethers v4

```ts
$ abi-types-generator ./abi-examples/fake-contract-abi.json  --output=./generated-typings --name=fake-contract --provider=ethers
```

Ethers v5

```ts
$ abi-types-generator ./abi-examples/fake-contract-abi.json  --output=./generated-typings --name=fake-contract --provider=ethers_v5
```

This will generate an `ts` file of `./generated-typings/fake-contract.ts` which has all your strongly typed methods and events.

All you meed to do is cast your `new ethers.Contract` code to an `ContractContext` which is exposed in where you defined the `--output` path to. In this example it is `./generated-typings/fake-contract.ts`

#### Example:

```ts
import { ethers } from 'ethers';
import { AbiExamples } from '../../abi-examples';
import { ContractContext } from './generated-typings/fake-contract';

// Connect to the network
const customHttpProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
);

// Has to cast to unknown as we have made some typings changes to the
// contract interfaces which conflicts with `ethers` typings.
// This all work great but the compiler gets confused.
// Casting to unknown first then the `ContractContext` solves this.
const contract = new ethers.Contract(
  AbiExamples.YOUR_CONTRACT_ADDRESS,
  AbiExamples.YOUR_ABI,
  customHttpProvider
) as unknown as ContractContext;
```

Easy as that 🔥🔥

#### Full example:

```ts
import { ethers, utils } from 'ethers';
import { AbiExamples } from '../../abi-examples';
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
  const contract = new ethers.Contract(
    AbiExamples.YOUR_CONTRACT_ADDRESS,
    AbiExamples.YOUR_ABI,
    customHttpProvider
  ) as unknown as ContractContext;

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

  // strongly typed optional overrides as well for both `calls` and `transactions`
  const tx = await contractWithSigner.tupleInputOnly(tupleExampleRequest, {
    // The maximum units of gas for the transaction to use
    gasLimit: 23000,

    // The price (in wei) per unit of gas
    gasPrice: utils.parseUnits('9.0', 'gwei'),

    // The nonce to use in the transaction
    nonce: 123,

    // The amount to send with the transaction (i.e. msg.value)
    value: utils.parseEther('1.0'),

    // The chain ID (or network ID) to use
    chainId: 1,
  });
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
```

If the ABI changes and I run the CLI command again or have a --watch on the file, when you try to compile it will flag any errors with your typings for you.

## Issues

Please raise any issues in the below link.

https://github.com/joshstevens19/ethereum-abi-types-generator/issues

## Thanks And Support

This package is brought to you by [Josh Stevens](https://github.com/joshstevens19). My aim is to be able to keep creating these awesome packages to help the Ethereum space grow with easier-to-use tools to allow the learning curve to get involved with blockchain development easier and making Ethereum ecosystem better. If you want to help with that vision and allow me to invest more time into creating cool packages or if this package has saved you a lot of development time donations are welcome, every little helps. By donating, you are supporting me to be able to maintain existing packages, extend existing packages (as Ethereum matures), and allowing me to build more packages for Ethereum due to being able to invest more time into it. Thanks, everyone!

## Direct donations

Direct donations any token accepted - Eth address > `0x699c2daD091ffcF18f3cd9E8495929CA3a64dFe1`

## Github sponsors

[sponsor me](https://github.com/sponsors/joshstevens19) via github using fiat money

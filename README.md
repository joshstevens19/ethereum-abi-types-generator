## ethereum-abi-types-generator

THIS IS NOT DEPLOYED YET ITS STILL WORK IN PROGRESS!!!!!

Typings for all your ethereum ABI contract methods and events with integration with `web3` and `ethers` 👏👏👏👏 Never have to have a runtime error again and bring them into compile time errors in 2 minutes.

A CLI tool which allows you to convert an ABI json file into fully loaded types.

## Installation

### npm:

```js
$ npm install ethereum-abi-types-generator
```

### yarn:

```js
$ yarn add ethereum-abi-types-generator
```

You can install this globally as well but you **must** make sure wherever the `--output` location is which generates the typings file has `ethereum-abi-types-generator` installed in that project, as it uses imports from this package to map the `ContractContext` to make your life easier handling the generic type build up automatically.

## CLI usage

```ts
$ ethereum-abi-types-generator <abiFileLocation>
$ ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME
$ ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --provider=web3|ethers
$ ethereum-abi-types-generator <abiFileLocation> --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME --provider=web3|ethers
$ ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers
$ ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}
```

### Arguments

#### `<abiFileLocation>` \* required

The ABI json file path location. Must be a JSON file path.

### `--name=ABI_NAME`

The ABI ts file you want it to be named as, this will also name interface and enums as this. It will remove any `-` and `.` for the `ts` interfaces and enum names.

If not supplied it will take the file name and use that as the abi name throughout.

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json'
```

generates: `'../examples/abi-examples/uniswap-factory-abi.ts'`

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --name='foo-abi'
```

generates: `'../examples/abi-examples/foo-abi.ts'`

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --name='foo.abi'
```

generates: `'../examples/abi-examples/foo.abi.ts'`

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --name='foo'
```

generates: `'../examples/abi-examples/foo.ts'`

### `--prettierOptions={YOUR_PRETTIER_OPTIONS}`

The prettier options you want to parse the `.ts` file as.

YOUR_PRETTIER_OPTIONS:

```ts
export interface RequiredOptions {
  /**
   * Specify the line length that the printer will wrap on.
   * @default 80
   */
  printWidth: number;
  /**
   * Specify the number of spaces per indentation-level.
   * @default 2
   */
  tabWidth: number;
  /**
   * Indent lines with tabs instead of spaces
   * @default false
   */
  useTabs: boolean;
  /**
   * Print semicolons at the ends of statements.
   * @default true
   */
  semi: boolean;
  /**
   * Use single quotes instead of double quotes.
   * @default false
   */
  singleQuote: boolean;
  /**
   * Use single quotes in JSX.
   * @default false
   */
  jsxSingleQuote: boolean;
  /**
   * Print trailing commas wherever possible.
   * @default 'es5'
   */
  trailingComma: 'none' | 'es5' | 'all';
  /**
   * Print spaces between brackets in object literals.
   * @default true
   */
  bracketSpacing: boolean;
  /**
   * Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.
   * @default false
   */
  jsxBracketSameLine: boolean;
  /**
   * Format only a segment of a file.
   * @default 0
   */
  rangeStart: number;
  /**
   * Format only a segment of a file.
   * @default Infinity
   */
  rangeEnd: number;
  /**
   * Specify which parser to use.
   */
  parser: BuiltInParserName | CustomParser;
  /**
   * Specify the input filepath. This will be used to do parser inference.
   */
  filepath: string;
  /**
   * Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
   * This is very useful when gradually transitioning large, unformatted codebases to prettier.
   * @default false
   */
  requirePragma: boolean;
  /**
   * Prettier can insert a special @format marker at the top of files specifying that
   * the file has been formatted with prettier. This works well when used in tandem with
   * the --require-pragma option. If there is already a docblock at the top of
   * the file then this option will add a newline to it with the @format marker.
   * @default false
   */
  insertPragma: boolean;
  /**
   * By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
   * In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.
   * @default 'preserve'
   */
  proseWrap: 'always' | 'never' | 'preserve';
  /**
   * Include parentheses around a sole arrow function parameter.
   * @default 'always'
   */
  arrowParens: 'avoid' | 'always';
  /**
   * The plugin API is in a beta state.
   */
  plugins: Array<string | Plugin>;
  /**
   * How to handle whitespaces in HTML.
   * @default 'css'
   */
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore';
  /**
   * Which end of line characters to apply.
   * @default 'lf'
   */
  endOfLine: 'auto' | 'lf' | 'crlf' | 'cr';
  /**
   * Change when properties in objects are quoted.
   * @default 'as-needed'
   */
  quoteProps: 'as-needed' | 'consistent' | 'preserve';
  /**
   * Whether or not to indent the code inside <script> and <style> tags in Vue files.
   * @default false
   */
  vueIndentScriptAndStyle: boolean;
}
```

This is wrapped in a:

```ts
export interface Options extends Partial<RequiredOptions> {}
```

Which means they are all optional to supply aka you can overrule just one.

If not supplied or you put an invalid prettier object in it will take the default prettier options in the project:

```ts
{
    parser: 'typescript',
    trailingComma: 'es5',
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 80,
}
```

If it's an invalid prettier options object it will emit a error log in the CLI command but still generate the file fine.

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --prettierOptions='{singleQuote: false}'
```

Will generate double quotes in the `.ts` output.

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json'
```

Will fallback to the default prettier options.

### `--output=PATH_DIRECTORY`

Where you want the `.ts` to be generated and saved to.

If not supplied it will use the directory of the `<abiFileLocation>` and generate it there.

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json'
```

generates in: `'../examples/abi-examples/uniswap-factory-abi.ts'`

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --output='../examples/ethers/generated-typings'
```

generates in: `'../examples/ethers/generated-typings/uniswap-factory-abi.ts'`

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --output='../examples/ethers/generated-typings' --name='foo'
```

generates: `'../examples/ethers/generated-typings/foo.ts'`

### `--provider=web3|ethers`

What `contract` support you want to generate. This is the library you are using on your dapp and the lib you use to call any contract calls.

```ts
export enum Provider {
  web3 = 'web3',
  ethers = 'ethers',
}
```

If not supplied it will fallback to `web3`

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json'
```

generates the web3 contract typings based on the web3 lib.

Example:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json' --provider='ethers'
```

generates the ethers contract typings based on the web3 lib.

### Using with web3 and ethers

#### Web3 - https://www.npmjs.com/package/web3

The cli tool will generate all your typings for you and expose them in the generated file. Its super easy to start using strongly typed interfaces for all your ABI calls.

Lets say i run the cli command:

```ts
$ ethereum-abi-types-generator '../examples/abi-examples/uniswap-factory-abi.json'  --output='../examples/web3/generated-typings' --name='factory-abi'
```

This will generate me a `ts` file of `'../examples/web3/factory-abi.ts'`.

You now just need to cast your `new web3.eth.Contract` code to `ContractContext` which is exposed in the `'../examples/web3/factory-abi.ts'`.

Example:

```ts
import { EventData } from 'ethereum-abi-types-generator';
import Web3 from 'web3';
import { ContractContext } from './generated-typings/factory-abi';

const example = async () => {
  const web3 = new Web3(
    'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
  );

  // Has to cast to unknown as we have made some typings changes to the
  // contract interfaces which conflicts with `web3` typings.
  // This all work great but the compiler gets confused.
  // Casting to unknown first then the `ContractContext` solves this.
  const contract = (new web3.eth.Contract(
    YOUR_ABI,
    YOUR_ABI_ADDRESS
  ) as unknown) as ContractContext;

  // you now have full typings on `contract.methods` which has generated docs
  const exchange = await contract.methods
    .getExchange('0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b')
    .call();

  // any none constant methods will have the correct interface on them as well
  // aka you cant call `.call()` here and the compile will show you this.
  // will also expose the event emitters for your typings to still work with web3
  contract.methods
    .initializeFactory('123')
    .send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' })
    .on('transactionHash', (hash: string) => {
      console.log(
        'This is will not do a proper call but just showing you an example'
      );
    });

  // full typings on your events with even the filter indexs which will
  // not compile if supply it incorrectly
  contract.events
    .NewExchange({ filter: { token: 'EXAMPLE_TOKEN' } })
    .on('data', (data: EventData) => {
      console.log('My event emitter has fired the event data', data);
    });

  console.log(exchange);
};

example();
```

now if the ABI changes and i run the CLI command again when you try to compile it will flag any errors with your typings for you.

### Ethers - https://www.npmjs.com/package/ethers

TODO

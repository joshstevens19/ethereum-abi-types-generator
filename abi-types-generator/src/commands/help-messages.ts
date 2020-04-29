import os = require('os');
import { IHelpMessage } from './models/ihelp-message';

const { EOL } = os;

export const generateHelpMessages: IHelpMessage = {
  commands: [],
  examples: [
    'ethereum-abi-types-generator <abiFileLocation>',
    'ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME',
    'ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --provider=web3|ethers',
    'ethereum-abi-types-generator <abiFileLocation> --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME --provider=web3|ethers ',
    'ethereum-abi-types-generator <abiFileLocation> --name=ABI_NAME --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers',
    'ethereum-abi-types-generator <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
  ],
  usage: 'ethereum-abi-types-generator <abiFileLocation>',
};

export const genericHelpMessage = [
  'Usage: abi <command> [options]' + EOL,
  'Options:',
  '    -V, --version  output the version number',
  '    -h, --help     output CLI help information' + EOL,
  'Commands:',
  '    generate       Generates the ABI typings',
  '    help [cmd]     Display help for [cmd]',
].join(EOL);

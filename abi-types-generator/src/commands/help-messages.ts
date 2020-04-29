import os = require('os');
import { IHelpMessage } from './models/ihelp-message';

const { EOL } = os;

export const generateHelpMessages: IHelpMessage = {
  commands: [],
  examples: [
    'abi generate <abiFileLocation>',
    'abi generate <abiFileLocation> --name=ABI_NAME',
    'abi generate <abiFileLocation> --name=ABI_NAME --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --provider=web3|ethers',
    'abi generate <abiFileLocation> --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --name=ABI_NAME --provider=web3|ethers ',
    'abi generate <abiFileLocation> --name=ABI_NAME --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers',
    'abi generate <abiFileLocation> --output=PATH_DIRECTORY --name=ABI_NAME --provider=web3|ethers --prettierOptions={YOUR_PRETTIER_OPTIONS}',
  ],
  usage: 'abi generate <abiFileLocation>',
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

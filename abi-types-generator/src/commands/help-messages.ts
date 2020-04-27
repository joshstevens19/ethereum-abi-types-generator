import os = require('os');
import { IHelpMessage } from './models/ihelp-message';

const { EOL } = os;

export const generateHelpMessages: IHelpMessage = {
  commands: [],
  examples: ['abi generate <abiPath>', 'abi generate <abiPath> --output=PATH'],
  usage: 'abi generate <abiPath>',
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

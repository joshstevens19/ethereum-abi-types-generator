import os = require('os');
import { IHelpMessage } from './models/ihelp-message';

const { EOL } = os;

export const configHelpMessages: IHelpMessage = {
  commands: [
    'show           show config',
    'set            set certain values in the config',
  ],
  examples: ['hex config show', 'hex config set --environment=dev'],
  usage: 'hex config <command>',
};

export const projectsHelpMessages: IHelpMessage = {
  commands: [
    'ls           show all projects',
    'info         get full details of a project. This will show everything.',
    'add          add a new personal project or team project',
  ],
  examples: [
    'hex projects ls',
    'hex projects info <projectId>',
    'hex projects add example-project',
    'hex projects add example-project --description=test',
    'hex projects add example-project --description=test --setPrivate',
    'hex projects add example-project --description=test --teamId=oOdLAkxAlrbGZlvMg',
    'hex projects add example-project --description=test --teamId=oOdLAkxAlrbGZlvMg --setPrivate ',
  ],
  usage: 'hex projects <command>',
};

export const teamsHelpMessages: IHelpMessage = {
  commands: ['ls           show all teams', 'info         get info one 1 team'],
  examples: ['hex teams ls', 'hex teams info <teamId>'],
  usage: 'hex teams <command>',
};

export const contractsHelpMessages: IHelpMessage = {
  commands: [
    'upload           upload a single contract or bulk upload many contracts (beta)',
    'upload init      generate the template json file to use for the upload (beta)',
  ],
  examples: [
    'hex contracts upload <jsonFilePath>',
    'hex contracts upload init',
  ],
  usage: 'hex contracts <command>',
};

export const loginHelpMessages: IHelpMessage = {
  commands: [],
  examples: ['hex login -u dave', 'hex login --username dave'],
  usage: 'hex login [ -u/--username username ]',
};

export const deployHelpMessages: IHelpMessage = {
  commands: [],
  examples: [
    'hex deploy --name mytoken --file token.sol --network ganache_aa39d',
    'hex deploy --name mytoken --file token.sol --address 0x0 --network ganache_aa39d',
  ],
  usage:
    'hex deploy --name <name> --file <file> --network <network> --address <address>',
};

export const ganacheHelpMessages: IHelpMessage = {
  commands: [
    'create         create a new ganache instance, if no `--projectId` is supplied it will use your default project',
    'delete         delete a new ganache instance',
    // tslint:disable-next-line: max-line-length
    'ls             get a list of all your ganache instances, if no `projectId` is supplied it will use your default project',
    'info           get information about your ganache instance',
  ],
  examples: [
    'hex ganache create',
    'hex ganache create --yaml=./ganache.yaml',
    'hex ganache create --projectId=rnGLdyaGzRbYlmjR',
    'hex ganache create --forked --network=main --block=56788',
    'hex ganache create --forked --network=main --block=56788 --projectId=rnGLdyaGzRbYlmjR',
    'hex ganache delete --slug=ganache-j12j3',
    'hex ganache ls',
    'hex ganache ls projectId',
    'hex ganache info <ganacheInstanceId>',
  ],
  usage: 'hex ganache <command>',
};

export const logsHelpMessages: IHelpMessage = {
  commands: [],
  examples: [
    // tslint:disable-next-line: max-line-length
    "hex logs info [--logLevels=error,warning,info,debug] [--dataMatch='Search this'] [--sources='Terminal,Truffle,CustomSource'] [--objectTypes=CONTRACT,CUSTOM_API,CUSTOM_DB,GANACHE,NETWORK_ENDPOINT,TRANSACTION_API,WALLET,WEBHOOK] [--projectIds=OQWmYxpdeWxnzXwp,OJWmPcrhaPxwqLws] [--from=1566124888713] [--to=1566127657944] [--size=10] [--offset=2] ",
  ],
  usage:
    // tslint:disable-next-line: max-line-length
    'hex logs info [optional parameters above]\nAny argument with `,` in means it can take as many properties as you want, each new property must be separated with a `,`\nplease note we only return a maximum of 10,000 logs per query so if you want to dig deeper please use the to and from arguments to filter the search down to a smaller ratio.',
};

export const genericHelpMessage = [
  'Usage: hex <command> [options]' + EOL,
  'Options:',
  '    -V, --version  output the version number',
  '    -h, --help     output CLI help information' + EOL,
  'Commands:',
  '    config         Show configuration',
  '    contracts      Contract CLI commands',
  // "    deploy         deploy contracts using the current ganache instance",
  '    projects       Projects CLI commands',
  '    ganache        Create, delete and get info for ganache instances',
  '    login          Login to your terminal account',
  '    logs           Get logs for your terminal account',
  '    logout         Logout of the CLI',
  '    teams          Teams information',
  '    whoami         Show profile details of the logged in user',
  '    help [cmd]     Display help for [cmd]',
].join(EOL);

#!/usr/bin/env node

// import dotenv = require('dotenv');
// import path = require('path');
import 'reflect-metadata';
import commands from '../commands/index';
// import commands from '../commands';
import Helpers from '../common/helpers';
import Logger from '../common/logger';

// we can create typings for this but its just getting the version
// if we import it then it wants the package.json in the src folder
// which we dont want
// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

(async () => {
  await execute();
})().catch((err) => Logger.error(err.message));

// To make it testable
export async function execute(): Promise<void> {
  Logger.log('');

  const args = Helpers.getProgramArguments();

  // @ts-ignore
  Logger.log(args);

  if (args.options.v || args.options.version) {
    return Logger.log('v' + packageJson.version);
  }

  if (args.options.help) {
    // return Logger.logErrorWithHelp(null);
  }

  if (args.command === 'help') {
    return Logger.logErrorWithHelp(args.subcommands[0] || null);
  }

  switch (args.command) {
    case 'generate':
      await commands.generate.action(args);
      break;
    default:
      Logger.logHelp();
  }

  //   const cmd = commands[args.command];

  //   if (!cmd) {
  //     if (args.command) {
  //       return Logger.logErrorWithHelp(
  //         null,
  //         `${args.command} is not a valid command`
  //       );
  //     } else {
  //       return Logger.logHelp();
  //     }
  //   }

  //   await cmd.action(args);
}

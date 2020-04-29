#!/usr/bin/env node

// import dotenv = require('dotenv');
// import path = require('path');
import 'reflect-metadata';
import { CommandTypes } from '../commands/enums/command-types';
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

export async function execute(): Promise<void> {
  const args = Helpers.getProgramArguments();

  if (args.options.v || args.options.version) {
    return Logger.log(packageJson.version);
  }

  if (args.command === 'help' || args.options.help) {
    // only supported command right now but written in away to extend wouldnt be too
    // much restructing
    return Logger.log(
      Helpers.getHelpMessageByCommandType(CommandTypes.generate)
    );
  }

  await commands.generate.action(args);
}

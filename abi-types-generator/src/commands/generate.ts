import Helpers from '../common/helpers';
import Logger from '../common/logger';
import { IProgramOptions } from '../common/models/iprogram-options';
import { ConverterType } from '../converters/enums/converter-type';
import { CommandTypes } from './enums/command-types';

export = {
  help: () => Helpers.getHelpMessageByCommandType(CommandTypes.generate),
  async action(cmd: IProgramOptions): Promise<void> {
    const abiPath = cmd.subcommands[0];
    const ouputPath = cmd.options.ouputPath || abiPath;
    const language = cmd.options.lang || ConverterType.ts;

    Logger.log(
      `successfully created typings for abi file ${abiPath} saved ${ouputPath}`
    );
  },
};

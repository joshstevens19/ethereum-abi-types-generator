import { Options } from 'prettier';
import Helpers from '../common/helpers';
import Logger from '../common/logger';
import { IProgramOptions } from '../common/models/iprogram-options';
import { ConverterType } from '../converters/enums/converter-type';
import AbiGenerator from '../converters/typescript/abi-generator';
import { Provider } from '../converters/typescript/enums/provider';
import { CommandTypes } from './enums/command-types';

export = {
  help: () => Helpers.getHelpMessageByCommandType(CommandTypes.generate),
  async action(cmd: IProgramOptions): Promise<void> {
    const abiPath = cmd.subcommands[0];
    const outputPath = cmd.options.outputPath || abiPath;
    const language = cmd.options.lang || ConverterType.ts;
    const provider = (cmd.options.provider as Provider) || Provider.web3;
    const name = cmd.options.name;
    const prettierOptions: Options | undefined = (cmd.options
      .prettierOptions as unknown) as Options;

    switch (language) {
      case ConverterType.ts:
        new AbiGenerator({
          provider,
          abiPath,
          outputPath,
          name,
          prettierOptions,
        });
        break;
      default:
        Logger.logErrorWithHelp(
          `${language} is not supported. Support languages are - 'ts'`
        );
        return;
    }

    Logger.log(
      `successfully created typings for abi file ${abiPath} saved ${outputPath}`
    );
  },
};

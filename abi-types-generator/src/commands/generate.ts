import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { ProgramOptions } from '../common/models/program-options';
import { ConverterType } from '../converters/enums/converter-type';
import AbiGenerator from '../converters/typescript/abi-generator';
import { Provider } from '../converters/typescript/enums/provider';
import { HardhatFactory } from '../converters/typescript/hardhat-factory';
import { CommandTypes } from './enums/command-types';

const help = Helpers.getHelpMessageByCommandType(CommandTypes.generate);

export = {
  async action(cmd: ProgramOptions): Promise<void> {
    if (!cmd.command || cmd.command.length === 0) {
      return Logger.log(help);
    }

    const language = cmd.options.lang || ConverterType.ts;

    try {
      switch (language) {
        case ConverterType.ts:
          if (cmd.command === 'hardhat') {
            const response = await new HardhatFactory().generate();
            if (response) {
              Logger.log(
                `successfully created typings for all contracts for hardhat, these are saved in ${response}`
              );
            }
          } else {
            const generateResponse = new AbiGenerator({
              provider: (cmd.options.provider as Provider) || Provider.web3,
              abiFileLocation: cmd.command,
              outputPathDirectory: cmd.options.output,
              name: cmd.options.name,
              watch: cmd.options.watch !== undefined,
            }).generate();

            Logger.log(
              `successfully created typings for abi file ${generateResponse.abiJsonFileLocation} saved in ${generateResponse.outputLocation}`
            );
          }
          break;
        default:
          Logger.error(
            `"${language}" is not supported. Support languages are - 'ts'`
          );
          return;
      }
    } catch (error) {
      Logger.error(error.message);
      return;
    }
  },
};

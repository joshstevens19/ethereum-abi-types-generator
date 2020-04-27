import { CommandTypes } from '../commands/enums/command-types';
import { generateHelpMessages } from '../commands/help-messages';
import { IHelpMessage } from '../commands/models/ihelp-message';
import { IProgramOptions } from './models/iprogram-options';
import yargs = require('yargs');

export default class Helpers {
  /**
   * Capitalize a string `hey` > `Hey`
   * @param str The value
   */
  public static capitalize(str: string): string {
    if (str == null) {
      return str;
    }

    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }

  /**
   * This will get all the program arguments
   */
  public static getProgramArguments(): IProgramOptions {
    const {
      _: [command, ...subcommands],
      ...options
    } = yargs.argv;
    return {
      command,
      options: Object.keys(options).reduce((r, v) => {
        // @ts-ignore
        r[v] = options[v];
        return r;
      }, {}),
      subcommands,
    };
  }

  /**
   * Gets the help message by the command type
   * @param commandType The command type
   */
  public static getHelpMessageByCommandType(commandType: CommandTypes): string {
    switch (commandType) {
      case CommandTypes.generate:
        return this.buildUpHelpMessage(generateHelpMessages);
      default:
        throw new Error('No help message for this command');
    }
  }

  /**
   * Builds the help message up
   * @param helpMessage The help message object
   */
  public static buildUpHelpMessage(helpMessage: IHelpMessage): string {
    let message = `Usage: ${helpMessage.usage}`;

    if (helpMessage.commands.length > 0) {
      message += '\n\nCommands:\n';
      for (let i = 0; i < helpMessage.commands.length; i++) {
        message += `    ${helpMessage.commands[i]}\n`;
      }
    } else {
      message += '\n';
    }

    message += '\nExamples:\n';

    for (let i = 0; i < helpMessage.examples.length; i++) {
      message += `    $ ${helpMessage.examples[i]}\n`;
    }

    return message;
  }
}

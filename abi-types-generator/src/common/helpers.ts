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
}

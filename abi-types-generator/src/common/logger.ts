import colors = require('colors');
import util = require('util');
import commands = require('../commands');

const { error: consoleErrorNative, log: consoleLogNative } = console;

export class Logger {
  /**
   * Render `console.error` in the terminal
   * @param msg The message
   * @param objects Any additional logs
   */
  public static error(msg: string, ...objects: any[]): void {
    this.consoleError(colors.red(msg), objects);
  }

  /**
   * Render `console.log` in the terminal
   * @param msg The message
   * @param objects Any additional logs
   */
  public static log(msg: string, ...objects: any[]): void {
    this.consoleLog(msg, objects);
  }

  /**
   * Render `console.log` in the terminal
   * @param msg The message
   * @param objects Any additional logs
   */
  public static logWithColour(
    msg: string | object,
    options: util.InspectOptions = {
      colors: true,
      depth: null,
      compact: false,
    }
  ): void {
    this.log(util.inspect(msg, options));
  }

  /**
   * Wrapper around `console.log` to use its native function
   * @param msg The message
   * @param objects Any additional logs
   */
  public static consoleLog(msg: string, ...objects: any[]): void {
    if (objects.length > 0 && objects[0].length > 0) {
      consoleLogNative.call(console, msg);
    } else {
      consoleLogNative.call(console, msg);
    }
  }

  /**
   * Wrapper around `console.error` to use its native function
   * @param msg The message
   * @param objects Any additional logs
   */
  private static consoleError(msg: string, ...objects: any[]): void {
    if (objects.length > 0 && objects[0].length > 0) {
      consoleErrorNative.call(console, msg, objects);
    } else {
      consoleErrorNative.call(console, msg);
    }
  }
}

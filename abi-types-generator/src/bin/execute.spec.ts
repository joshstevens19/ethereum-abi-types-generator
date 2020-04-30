import commands from '../commands';
import { CommandTypes } from '../commands/enums/command-types';
import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { execute } from './execute';

describe('Generator CLI', () => {
  const version = '1.0.0';
  let actionSpy: jasmine.Spy;

  beforeEach(() => {
    actionSpy = spyOn(commands.generate, 'action').and.callFake(jest.fn());
  });

  describe('execute', () => {
    it('should get the program args', async () => {
      const getProgramArgumentsSpy = spyOn(
        Helpers,
        'getProgramArguments'
      ).and.callThrough();

      await execute(version);

      expect(getProgramArgumentsSpy).toHaveBeenCalledTimes(1);
    });

    it('should log the version if --version is supplied', async () => {
      spyOn(Helpers, 'getProgramArguments').and.returnValue({
        options: {
          version: true,
        },
      });

      const logSpy = spyOn(Logger, 'log').and.callThrough();

      await execute(version);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(version);
    });

    it('should log the version if -v is supplied', async () => {
      spyOn(Helpers, 'getProgramArguments').and.returnValue({
        options: {
          v: true,
        },
      });

      const logSpy = spyOn(Logger, 'log').and.callThrough();

      await execute(version);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(version);
    });

    it('should log the help is --help is supplied', async () => {
      spyOn(Helpers, 'getProgramArguments').and.returnValue({
        options: {
          help: true,
        },
      });

      const spy = spyOn(
        Helpers,
        'getHelpMessageByCommandType'
      ).and.callThrough();

      const logSpy = spyOn(Logger, 'log').and.callThrough();

      await execute(version);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(CommandTypes.generate);
    });

    it('should log the help if help is the command', async () => {
      spyOn(Helpers, 'getProgramArguments').and.returnValue({
        command: 'help',
        options: {},
      });

      const spy = spyOn(
        Helpers,
        'getHelpMessageByCommandType'
      ).and.callThrough();

      const logSpy = spyOn(Logger, 'log').and.callThrough();

      await execute(version);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(CommandTypes.generate);
    });

    it('should call `commands.generate.action`', async () => {
      const logSpy = spyOn(Logger, 'log').and.callThrough();

      spyOn(Helpers, 'getProgramArguments').and.returnValue({
        command: 'location',
        subcommands: [],
        options: {},
      });

      await execute(version);

      expect(actionSpy).toHaveBeenCalledTimes(1);
      expect(actionSpy).toHaveBeenCalledWith({
        command: 'location',
        subcommands: [],
        options: {},
      });
      expect(logSpy).toHaveBeenCalledTimes(0);
    });
  });
});

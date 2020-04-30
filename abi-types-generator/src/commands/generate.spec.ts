import commands = require('.');
import Helpers from '../common/helpers';
import { Logger } from '../common/logger';
import { IProgramOptions } from '../common/models/iprogram-options';
import AbiGenerator from '../converters/typescript/abi-generator';
import { GenerateResponse } from '../converters/typescript/models/generate-response';
import { CommandTypes } from './enums/command-types';

const programOptions: IProgramOptions = {
  command: 'abi/abi.json',
  subcommands: [],
  options: {},
};

class MockAbiGenerator extends AbiGenerator {
  constructor() {
    super(null as any);
  }

  public generate(): GenerateResponse {
    return {
      outputLocation: 'test-output-location',
      abiJsonFileLocation: programOptions.command,
    };
  }
}

describe('Generate', () => {
  const command = commands.generate;

  beforeEach(() => {
    // @ts-ignore
    AbiGenerator = MockAbiGenerator;
  });

  it('should have the action object exported', () => {
    expect(command).toHaveProperty('action');
  });

  it('should log a message if no command are passed in', async () => {
    const logSpy = spyOn(Logger, 'log').and.callThrough();

    await command.action({ command: undefined } as any);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      Helpers.getHelpMessageByCommandType(CommandTypes.generate)
    );
  });

  it('should log a message if command is an empty string', async () => {
    const logSpy = spyOn(Logger, 'log').and.callThrough();

    await command.action({ command: '' } as any);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      Helpers.getHelpMessageByCommandType(CommandTypes.generate)
    );
  });

  it('should call log an error if language is invalid', async () => {
    const logErrorSpy = spyOn(Logger, 'error').and.callThrough();

    await command.action({
      command: 'abi/abi.json',
      subcommands: [],
      options: { lang: 'blah' },
    });

    expect(logErrorSpy).toHaveBeenCalledTimes(1);
    expect(logErrorSpy).toHaveBeenCalledWith(
      '"blah" is not supported. Support languages are - \'ts\''
    );
  });

  it('should on success log success message and nothing else', async () => {
    const logErrorSpy = spyOn(Logger, 'error').and.callThrough();
    const logSpy = spyOn(Logger, 'log').and.callThrough();

    await command.action(programOptions);

    expect(logErrorSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      'successfully created typings for abi file abi/abi.json saved in test-output-location'
    );
  });
});

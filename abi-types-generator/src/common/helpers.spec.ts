import { CommandTypes } from '../commands/enums/command-types';
import { generateHelpMessages } from '../commands/help-messages';
import Helpers from './helpers';

describe('Helpers', () => {
  describe('capitalize', () => {
    it('should return null if null is sent to the value', () => {
      // tslint:disable-next-line: no-any
      expect(Helpers.capitalize(null as any)).toEqual(null);
    });

    it('should convert `hey` > `Hey`', () => {
      expect(Helpers.capitalize('hey')).toEqual('Hey');
    });
  });

  describe('getProgramArguments', () => {
    it('should return jests cli execution objects running', () => {
      expect(Helpers.getProgramArguments()).toHaveProperty('command');
      expect(Helpers.getProgramArguments()).toHaveProperty('options');
      expect(Helpers.getProgramArguments()).toHaveProperty('subcommands');
    });
  });

  describe('getHelpMessageByCommandType', () => {
    it('should throw a error if command is not a type', () => {
      expect(() => {
        // tslint:disable-next-line: no-any
        Helpers.getHelpMessageByCommandType('incorrect' as any);
      }).toThrow(Error);
    });

    it('should build a help message by calling `buildUpHelpMessage` returning a string', () => {
      const spy = spyOn(Helpers, 'buildUpHelpMessage').and.callThrough();

      const message = Helpers.getHelpMessageByCommandType(
        CommandTypes.generate
      );

      expect(spy).toHaveBeenCalledTimes(1);
      expect(message.length).toBeGreaterThan(0);
    });
  });

  describe('buildUpHelpMessage', () => {
    it('should render the correct output message', () => {
      const helperMessageObject = Helpers.deepClone(generateHelpMessages);
      helperMessageObject.commands.push('test');
      const result = Helpers.buildUpHelpMessage(helperMessageObject);

      expect(result.includes('Usage')).toEqual(true);
      expect(result.includes('Commands')).toEqual(true);
      expect(result.includes('Examples')).toEqual(true);
    });

    it('should render the correct output message with no commands', () => {
      const helperMessageObject = generateHelpMessages;
      helperMessageObject.commands = [];
      const result = Helpers.buildUpHelpMessage(helperMessageObject);

      expect(result.includes('Usage')).toEqual(true);
      expect(result.includes('Commands')).toEqual(false);
      expect(result.includes('Examples')).toEqual(true);
    });
  });

  describe('removeAllWhiteSpace', () => {
    it('should remove all white spaces from the string', () => {
      expect(Helpers.removeAllWhiteSpace('  test      test   me')).toEqual(
        'testtestme'
      );
    });
  });

  describe('deepClone', () => {
    it('should deep clone a object', () => {
      const foo = { bar: true };
      const clone = Helpers.deepClone(foo);
      clone.bar = false;
      expect(foo).not.toEqual(clone);
    });
  });
});

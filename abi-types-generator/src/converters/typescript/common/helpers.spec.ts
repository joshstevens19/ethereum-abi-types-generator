import { SolidityType } from '../../../abi-properties';
import TypeScriptHelpers from './helpers';

describe('TypeScriptHelpers', () => {
  describe('getSolidityTsType', () => {
    it('should return string with type `SolidityType.address`', () => {
      expect(TypeScriptHelpers.getSolidityTsType(SolidityType.address)).toEqual(
        'string'
      );
    });

    it('should return string with type `SolidityType.bytes32`', () => {
      expect(TypeScriptHelpers.getSolidityTsType(SolidityType.bytes32)).toEqual(
        'string'
      );
    });

    it('should return string with type `SolidityType.uint256`', () => {
      expect(TypeScriptHelpers.getSolidityTsType(SolidityType.uint256)).toEqual(
        'string'
      );
    });

    it('should return boolean with type `SolidityType.bool`', () => {
      expect(TypeScriptHelpers.getSolidityTsType(SolidityType.bool)).toEqual(
        'boolean'
      );
    });

    it('should throw an error if solidity type can not be found', () => {
      expect(() => {
        TypeScriptHelpers.getSolidityTsType('blah' as any);
      }).toThrowError('blah is not a whitelisted input output type');
    });
  });

  describe('buildInterface', () => {
    it('should build interface', () => {
      expect(
        TypeScriptHelpers.buildInterface(
          'TestInterface',
          'testProperty: string;'
        )
      ).toEqual('export interface TestInterface { testProperty: string; }');
    });
  });

  describe('buildEnum', () => {
    it('should build enum', () => {
      expect(TypeScriptHelpers.buildEnum('TestEnum', 'test = "test"')).toEqual(
        'export enum TestEnum { test = "test" }'
      );
    });
  });
});

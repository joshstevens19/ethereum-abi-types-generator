import TypeScriptHelpers from './helpers';

describe('TypeScriptHelpers', () => {
  describe('getSolidityTsType', () => {
    describe('address', () => {
      it('should return correct result with no arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('address')).toEqual(
          'string'
        );
      });

      it('should return correct result with fixed array', () => {
        expect(TypeScriptHelpers.getSolidityTsType('address[4]')).toEqual(
          '[string,string,string,string,string]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('address[4][]')).toEqual(
          '[string,string,string,string,string][]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('address[][][]')).toEqual(
          'string[][][]'
        );
      });
    });

    describe('uint', () => {
      it('should return correct result with no arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('uint')).toEqual('string');
      });

      it('should return correct result with fixed array', () => {
        expect(TypeScriptHelpers.getSolidityTsType('uint[4]')).toEqual(
          '[string,string,string,string,string]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('uint[4][]')).toEqual(
          '[string,string,string,string,string][]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('uint[][][]')).toEqual(
          'string[][][]'
        );
      });
    });

    describe('bytes', () => {
      it('should return correct result with no arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bytes')).toEqual('string');
      });

      it('should return correct result with fixed array', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bytes[4]')).toEqual(
          '[string,string,string,string,string]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bytes[4][]')).toEqual(
          '[string,string,string,string,string][]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bytes[][][]')).toEqual(
          'string[][][]'
        );
      });
    });

    describe('string', () => {
      it('should return correct result with no arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('string')).toEqual('string');
      });

      it('should return correct result with fixed array', () => {
        expect(TypeScriptHelpers.getSolidityTsType('string[4]')).toEqual(
          '[string,string,string,string,string]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('string[4][]')).toEqual(
          '[string,string,string,string,string][]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('string[][][]')).toEqual(
          'string[][][]'
        );
      });
    });

    describe('int', () => {
      it('should return correct result with no arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('int')).toEqual('string');
      });

      it('should return correct result with fixed array', () => {
        expect(TypeScriptHelpers.getSolidityTsType('int[4]')).toEqual(
          '[string,string,string,string,string]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('int[4][]')).toEqual(
          '[string,string,string,string,string][]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('int[][][]')).toEqual(
          'string[][][]'
        );
      });
    });

    describe('bool', () => {
      it('should return correct result with no arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bool')).toEqual('boolean');
      });

      it('should return correct result with fixed array', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bool[4]')).toEqual(
          '[boolean,boolean,boolean,boolean,boolean]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bool[4][]')).toEqual(
          '[boolean,boolean,boolean,boolean,boolean][]'
        );
      });

      it('should return correct result with fixed multidimensional arrays', () => {
        expect(TypeScriptHelpers.getSolidityTsType('bool[][][]')).toEqual(
          'boolean[][][]'
        );
      });
    });

    it('should throw an error if solidity type can not be found', () => {
      expect(() => {
        TypeScriptHelpers.getSolidityTsType('blah' as any);
      }).toThrowError('blah is not valid solidty type');
    });
  });

  describe('buildUpMultidimensionalArrayTypes', () => {
    it('should take a fixed size multidimensional array and convert it to an type', () => {
      expect(
        TypeScriptHelpers.buildUpMultidimensionalArrayTypes(
          'bytes32[4][][2][][9][]',
          'string'
        )
      ).toEqual('[string,string,string,string,string][][][][][]');
    });

    it('should take a unbounded size multidimensional array and convert it to an type', () => {
      expect(
        TypeScriptHelpers.buildUpMultidimensionalArrayTypes(
          'bytes32[][]',
          'string'
        )
      ).toEqual('string[][]');
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

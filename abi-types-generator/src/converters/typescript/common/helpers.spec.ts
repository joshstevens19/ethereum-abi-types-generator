import { AbiOutput } from '../../../abi-properties';
import { Provider } from '../enums/provider';
import TypeScriptHelpers from './helpers';

describe('TypeScriptHelpers', () => {
  describe('getSolidityInputTsType', () => {
    describe('ethers', () => {
      describe('address', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('address', Provider.ethers)
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'address[4]',
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'address[4][]',
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'address[][][]',
              Provider.ethers
            )
          ).toEqual('string[][][]');
        });
      });

      describe('uint', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint', Provider.ethers)
          ).toEqual('BigNumberish');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint32', Provider.ethers)
          ).toEqual('BigNumberish');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint[4]', Provider.ethers)
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]'
          );
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint32[4]',
              Provider.ethers
            )
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint[4][]',
              Provider.ethers
            )
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint32[4][]',
              Provider.ethers
            )
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint[][][]',
              Provider.ethers
            )
          ).toEqual('BigNumberish[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint32[][][]',
              Provider.ethers
            )
          ).toEqual('BigNumberish[][][]');
        });
      });

      describe('bytes', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bytes', Provider.ethers)
          ).toEqual('Arrayish');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bytes32', Provider.ethers)
          ).toEqual('Arrayish');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes[4]',
              Provider.ethers
            )
          ).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes32[4]',
              Provider.ethers
            )
          ).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes[4][]',
              Provider.ethers
            )
          ).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes32[4][]',
              Provider.ethers
            )
          ).toEqual('[Arrayish,Arrayish,Arrayish,Arrayish,Arrayish][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes[][][]',
              Provider.ethers
            )
          ).toEqual('Arrayish[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes32[][][]',
              Provider.ethers
            )
          ).toEqual('Arrayish[][][]');
        });
      });

      describe('string', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('string', Provider.ethers)
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'string[4]',
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'string[4][]',
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'string[][][]',
              Provider.ethers
            )
          ).toEqual('string[][][]');
        });
      });

      describe('int', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int', Provider.ethers)
          ).toEqual('BigNumberish');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int32', Provider.ethers)
          ).toEqual('BigNumberish');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int[4]', Provider.ethers)
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]'
          );
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int32[4]',
              Provider.ethers
            )
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int[4][]',
              Provider.ethers
            )
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int32[4][]',
              Provider.ethers
            )
          ).toEqual(
            '[BigNumberish,BigNumberish,BigNumberish,BigNumberish,BigNumberish][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int[][][]',
              Provider.ethers
            )
          ).toEqual('BigNumberish[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int32[][][]',
              Provider.ethers
            )
          ).toEqual('BigNumberish[][][]');
        });
      });

      describe('bool', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bool', Provider.ethers)
          ).toEqual('boolean');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bool[4]', Provider.ethers)
          ).toEqual('[boolean,boolean,boolean,boolean,boolean]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bool[4][]',
              Provider.ethers
            )
          ).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bool[][][]',
              Provider.ethers
            )
          ).toEqual('boolean[][][]');
        });
      });

      it('should throw an error if solidity type can not be found', () => {
        expect(() => {
          TypeScriptHelpers.getSolidityInputTsType(
            // tslint:disable-next-line: no-any
            'blah' as any,
            Provider.ethers
          );
        }).toThrowError('blah is not valid solidty type');
      });
    });

    describe('web3', () => {
      describe('address', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('address', Provider.web3)
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'address[4]',
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'address[4][]',
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'address[][][]',
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('uint', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint', Provider.web3)
          ).toEqual('string');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint32', Provider.web3)
          ).toEqual('string | number');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint[4]', Provider.web3)
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint32[4]', Provider.web3)
          ).toEqual(
            '[string | number,string | number,string | number,string | number,string | number]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('uint[4][]', Provider.web3)
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint32[4][]',
              Provider.web3
            )
          ).toEqual(
            '[string | number,string | number,string | number,string | number,string | number][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint[][][]',
              Provider.web3
            )
          ).toEqual('string[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'uint32[][][]',
              Provider.web3
            )
          ).toEqual('string | number[][][]');
        });
      });

      describe('bytes', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bytes', Provider.web3)
          ).toEqual('string | number[]');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bytes32', Provider.web3)
          ).toEqual('string | number[]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bytes[4]', Provider.web3)
          ).toEqual(
            '[string | number[],string | number[],string | number[],string | number[],string | number[]]'
          );
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes32[4]',
              Provider.web3
            )
          ).toEqual(
            '[string | number[],string | number[],string | number[],string | number[],string | number[]]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes[4][]',
              Provider.web3
            )
          ).toEqual(
            '[string | number[],string | number[],string | number[],string | number[],string | number[]][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes32[4][]',
              Provider.web3
            )
          ).toEqual(
            '[string | number[],string | number[],string | number[],string | number[],string | number[]][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes[][][]',
              Provider.web3
            )
          ).toEqual('string | number[][][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bytes32[][][]',
              Provider.web3
            )
          ).toEqual('string | number[][][][]');
        });
      });

      describe('string', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('string', Provider.web3)
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('string[4]', Provider.web3)
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'string[4][]',
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'string[][][]',
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('int', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int', Provider.web3)
          ).toEqual('string');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int32', Provider.web3)
          ).toEqual('string | number');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int[4]', Provider.web3)
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int32[4]', Provider.web3)
          ).toEqual(
            '[string | number,string | number,string | number,string | number,string | number]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int[4][]', Provider.web3)
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int32[4][]',
              Provider.web3
            )
          ).toEqual(
            '[string | number,string | number,string | number,string | number,string | number][]'
          );
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('int[][][]', Provider.web3)
          ).toEqual('string[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'int32[][][]',
              Provider.web3
            )
          ).toEqual('string | number[][][]');
        });
      });

      describe('bool', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bool', Provider.web3)
          ).toEqual('boolean');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bool[4]', Provider.web3)
          ).toEqual('[boolean,boolean,boolean,boolean,boolean]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType('bool[4][]', Provider.web3)
          ).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityInputTsType(
              'bool[][][]',
              Provider.web3
            )
          ).toEqual('boolean[][][]');
        });
      });

      it('should throw an error if solidity type can not be found', () => {
        expect(() => {
          TypeScriptHelpers.getSolidityInputTsType(
            // tslint:disable-next-line: no-any
            'blah' as any,
            Provider.web3
          );
        }).toThrowError('blah is not valid solidty type');
      });
    });
  });

  describe('getSolidityOutputTsType', () => {
    describe('ethers', () => {
      describe('address', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string[][][]');
        });
      });

      describe('uint', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('BigNumber');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('number');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[number,number,number,number,number]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[number,number,number,number,number][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('BigNumber[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('number[][][]');
        });
      });

      describe('bytes', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string[][][]');
        });
      });

      describe('string', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('string[][][]');
        });
      });

      describe('int', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('BigNumber');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('number');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[number,number,number,number,number]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[BigNumber,BigNumber,BigNumber,BigNumber,BigNumber][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[number,number,number,number,number][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('BigNumber[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('number[][][]');
        });
      });

      describe('bool', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('boolean');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool[4]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[boolean,boolean,boolean,boolean,boolean]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool[4][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool[][][]' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('boolean[][][]');
        });
      });

      describe('tuple', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'tuple', name: 'hey' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('HeyResponse');
        });

        it('should return correct result with array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'tuple[]', name: 'hey' } as AbiOutput,
              Provider.ethers
            )
          ).toEqual('HeyResponse[]');
        });
      });

      it('should throw an error if solidity type can not be found', () => {
        expect(() => {
          TypeScriptHelpers.getSolidityOutputTsType(
            { type: 'blah' } as AbiOutput,
            Provider.ethers
          );
        }).toThrowError('blah is not valid solidty type');
      });
    });

    describe('web3', () => {
      describe('address', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'address[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('uint', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'uint32[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('bytes', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bytes32[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('string', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'string[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('int', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[string,string,string,string,string][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'int32[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('string[][][]');
        });
      });

      describe('bool', () => {
        it('should return correct result with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('boolean');
        });

        it('should return correct result with fixed array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool[4]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[boolean,boolean,boolean,boolean,boolean]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool[4][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('[boolean,boolean,boolean,boolean,boolean][]');
        });

        it('should return correct result with fixed multidimensional arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'bool[][][]' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('boolean[][][]');
        });
      });

      describe('tuple', () => {
        it('should return correct response with no arrays', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'tuple', name: 'hey' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('HeyResponse');
        });

        it('should return response as an array', () => {
          expect(
            TypeScriptHelpers.getSolidityOutputTsType(
              { type: 'tuple[]', name: 'hey' } as AbiOutput,
              Provider.web3
            )
          ).toEqual('HeyResponse[]');
        });
      });

      it('should throw an error if solidity type can not be found', () => {
        expect(() => {
          TypeScriptHelpers.getSolidityOutputTsType(
            { type: 'blah' } as AbiOutput,
            Provider.web3
          );
        }).toThrowError('blah is not valid solidty type');
      });
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

  describe('buildType', () => {
    it('should build type', () => {
      expect(
        TypeScriptHelpers.buildType('TestEvents', ['test', 'test2'])
      ).toEqual('export type TestEvents = "test" | "test2";');
    });

    it('should return correct build tupe if no events exist', () => {
      expect(TypeScriptHelpers.buildType('TestEvents', [])).toEqual(
        'export type TestEvents = undefined;'
      );
    });
  });
});

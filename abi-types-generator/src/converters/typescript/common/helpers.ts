import { SolidityType } from '../../../abi-properties';
import Helpers from '../../../common/helpers';
import { Provider } from '../enums/provider';

export default class TypeScriptHelpers {
  /**
   * Get the solidity ouput type mapped to typescript type
   * @param type The solidity type
   */
  public static getSolidityInputTsType(
    type: string,
    provider: Provider
  ): string {
    switch (provider) {
      case Provider.ethers: {
        if (type.includes(SolidityType.bytes)) {
          if (type.includes('[')) {
            return this.buildUpMultidimensionalArrayTypes(type, 'Arrayish');
          }

          return 'Arrayish';
        }

        if (
          type.includes(SolidityType.uint) ||
          type.includes(SolidityType.int)
        ) {
          if (type.includes('[')) {
            return this.buildUpMultidimensionalArrayTypes(type, 'BigNumberish');
          }

          return 'BigNumberish';
        }
      }
      case Provider.web3: {
        if (type.includes(SolidityType.bytes)) {
          if (type.includes('[')) {
            return this.buildUpMultidimensionalArrayTypes(
              type,
              'string | number[]'
            );
          }

          return 'string | number[]';
        }

        if (
          type.includes(SolidityType.uint) ||
          type.includes(SolidityType.int)
        ) {
          if (type.includes(SolidityType.uint)) {
            const numberType = this.buildWeb3NumberType(
              type,
              SolidityType.uint
            );

            if (type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(type, numberType);
            }

            return numberType;
          }

          if (type.includes(SolidityType.int)) {
            const numberType = this.buildWeb3NumberType(type, SolidityType.int);

            if (type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(type, numberType);
            }

            return numberType;
          }
        }
      }
    }

    if (type.includes(SolidityType.bool)) {
      if (type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(type, 'boolean');
      }
      return 'boolean';
    }

    // always fall back to hex string if something goes nuts in the ABI
    // should not happen but good having some fallback
    if (
      type.includes(SolidityType.address) ||
      type.includes(SolidityType.uint) ||
      type.includes(SolidityType.bytes) ||
      type.includes(SolidityType.string) ||
      type.includes(SolidityType.int)
    ) {
      if (type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(type, 'string');
      }

      return 'string';
    }

    throw new Error(`${type} is not valid solidty type`);
  }

  /**
   * Get the solidity type mapped to typescript type
   * @param type The solidity type
   */
  public static getSolidityOutputTsType(
    type: string,
    provider: Provider
  ): string {
    // any bespoke provider output type logic
    switch (provider) {
      case Provider.ethers: {
        if (
          type.includes(SolidityType.uint) ||
          type.includes(SolidityType.int)
        ) {
          if (type.includes(SolidityType.uint)) {
            const numberType = this.buildEtherjsNumberType(
              type,
              SolidityType.uint
            );

            if (type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(type, numberType);
            }

            return numberType;
          }

          if (type.includes(SolidityType.int)) {
            const numberType = this.buildEtherjsNumberType(
              type,
              SolidityType.int
            );

            if (type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(type, numberType);
            }

            return numberType;
          }
        }
      }
    }

    if (type.includes(SolidityType.bool)) {
      if (type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(type, 'boolean');
      }
      return 'boolean';
    }

    if (
      type.includes(SolidityType.address) ||
      type.includes(SolidityType.string) ||
      type.includes(SolidityType.bytes) ||
      type.includes(SolidityType.uint) ||
      type.includes(SolidityType.int)
    ) {
      if (type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(type, 'string');
      }

      return 'string';
    }

    throw new Error(`${type} is not valid solidty type`);
  }

  /**
   * Build etherjs number type
   * @param type The ABI type
   * @param solidityType The solidity type
   */
  private static buildEtherjsNumberType(
    type: string,
    solidityType: SolidityType.uint | SolidityType.int
  ): 'number' | 'BigNumber' {
    const clonedType = Helpers.deepClone(type);

    const bits = clonedType.replace(solidityType, '').split('[')[0];
    const totalBits = Number(bits);
    if (bits.length > 0 && !isNaN(totalBits)) {
      return totalBits <= 48 ? 'number' : 'BigNumber';
    }

    return 'BigNumber';
  }

  /**
   * Build web3 number type
   * @param type The ABI type
   * @param solidityType The solidity type
   */
  private static buildWeb3NumberType(
    type: string,
    solidityType: SolidityType.uint | SolidityType.int
  ): 'string | number' | 'string' {
    const clonedType = Helpers.deepClone(type);

    const bits = clonedType.replace(solidityType, '').split('[')[0];
    const totalBits = Number(bits);
    if (bits.length > 0 && !isNaN(totalBits)) {
      return totalBits <= 48 ? 'string | number' : 'string';
    }

    return 'string';
  }

  /**
   * Build up multidimensional array types
   * Typescript does not support syntax `[string, string][string, string]`
   * so we can only strongly type the fixed length of the first array
   * for example `bytes32[4][][2][][9][]` > `[string,string,string,string,string][][][][][]`
   * is you have any other fixed size arrays passed dimension it will have to generate a unbounded
   * array size aka `bytes32[][4] > `string[][]`
   * @param abiType The ABI type in the json
   * @param tsType The typescript type
   */
  public static buildUpMultidimensionalArrayTypes(
    abiType: string,
    tsType: string
  ): string {
    const split = abiType.split('[');
    split.shift();
    let buildType = '';
    for (let i = 0; i < split.length; i++) {
      // we can only put fixed sizes on the first fixed length
      // array rest has to be `[]` due to TS limited support
      if (i === 0 && split[i].length > 1) {
        const arrayLength = Number(split[i].split(']')[0]);
        let index = 0;
        buildType = '[';
        while (index <= arrayLength) {
          if (index === arrayLength) {
            buildType += `${tsType}`;
            index++;
          } else {
            buildType += `${tsType},`;
            index++;
          }
        }

        buildType += ']';
      } else {
        if (i === 0) {
          buildType += `${tsType}[]`;
        } else {
          buildType += '[]';
        }
      }
    }

    return buildType;
  }

  /**
   * Generates an interface
   * @param interfaceName The interface name
   * @param interfaceContext The interface context
   */
  public static buildInterface(
    interfaceName: string,
    interfaceContext: string
  ): string {
    return `export interface ${interfaceName} { ${interfaceContext} }`;
  }

  /**
   * Build type
   * @param typeName The type name
   * @param types The types
   */
  public static buildType(typeName: string, types: string[]): string {
    let result = '';

    types.map((type) => {
      if (result.length > 0) {
        result += ' | ';
      }
      result += `"${type}"`;
    });

    if (result.length === 0) {
      result += 'undefined';
    }

    return `export type ${typeName} = ${result};`;
  }
}

import fs from 'fs-extra';
import path from 'path';
import { AbiInput, AbiOutput, SolidityType } from '../../../abi-properties';
import Helpers from '../../../common/helpers';
import { Provider } from '../enums/provider';

export default class TypeScriptHelpers {
  public static getSolidityInputTsTypeByTypeName(
    type: string,
    provider: Provider
  ): string {
    // tslint:disable-next-line: no-any
    return this.getSolidityInputTsType({ type } as any, provider);
  }

  /**
   * Get the solidity input type mapped to typescript type
   * @param type The solidity type
   */
  public static getSolidityInputTsType(
    abiInput: AbiInput,
    provider: Provider,
    prefix: 'Request' | 'EventEmittedResponse' = 'Request'
  ): string {
    switch (provider) {
      case Provider.ethers:
      case Provider.ethers_v5:
        {
          if (abiInput.type.includes(SolidityType.bytes)) {
            if (abiInput.type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(
                abiInput.type,
                'Arrayish'
              );
            }

            return 'Arrayish';
          }

          if (
            abiInput.type.includes(SolidityType.uint) ||
            abiInput.type.includes(SolidityType.int)
          ) {
            if (abiInput.type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(
                abiInput.type,
                'BigNumberish'
              );
            }

            return 'BigNumberish';
          }
        }
        break;
      case Provider.web3:
        {
          if (abiInput.type.includes(SolidityType.bytes)) {
            if (abiInput.type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(
                abiInput.type,
                'string | number[]'
              );
            }

            return 'string | number[]';
          }

          if (
            abiInput.type.includes(SolidityType.uint) ||
            abiInput.type.includes(SolidityType.int)
          ) {
            if (abiInput.type.includes(SolidityType.uint)) {
              const numberType = this.buildWeb3NumberType(
                abiInput.type,
                SolidityType.uint
              );

              if (abiInput.type.includes('[')) {
                return this.buildUpMultidimensionalArrayTypes(
                  abiInput.type,
                  numberType
                );
              }

              return numberType;
            }

            if (abiInput.type.includes(SolidityType.int)) {
              const numberType = this.buildWeb3NumberType(
                abiInput.type,
                SolidityType.int
              );

              if (abiInput.type.includes('[')) {
                return this.buildUpMultidimensionalArrayTypes(
                  abiInput.type,
                  numberType
                );
              }

              return numberType;
            }
          }
        }
        break;
    }

    if (abiInput.type.includes(SolidityType.bool)) {
      if (abiInput.type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'boolean');
      }
      return 'boolean';
    }

    // always fall back to hex string if something goes nuts in the ABI
    // should not happen but good having some fallback
    if (
      abiInput.type.includes(SolidityType.address) ||
      abiInput.type.includes(SolidityType.uint) ||
      abiInput.type.includes(SolidityType.bytes) ||
      abiInput.type.includes(SolidityType.string) ||
      abiInput.type.includes(SolidityType.int)
    ) {
      if (abiInput.type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(abiInput.type, 'string');
      }

      return 'string';
    }

    if (abiInput.type.includes(SolidityType.tuple)) {
      const interfaceName = this.buildInterfaceName(abiInput, prefix);
      if (abiInput.type.includes('[')) {
        return `${interfaceName}[]`;
      }

      return interfaceName;
    }

    throw new Error(`${abiInput.type} is not valid solidty type`);
  }

  /**
   * Get the solidity type mapped to typescript type
   * @param abiOutput The abi output type
   * @param provider The provider
   */
  public static getSolidityOutputTsType(
    abiOutput: AbiOutput,
    provider: Provider
  ): string {
    // any bespoke provider output type logic
    switch (provider) {
      case Provider.ethers:
      case Provider.ethers_v5: {
        if (
          abiOutput.type.includes(SolidityType.uint) ||
          abiOutput.type.includes(SolidityType.int)
        ) {
          if (abiOutput.type.includes(SolidityType.uint)) {
            const numberType = this.buildEtherjsNumberType(
              abiOutput.type,
              SolidityType.uint
            );

            if (abiOutput.type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(
                abiOutput.type,
                numberType
              );
            }

            return numberType;
          }

          if (abiOutput.type.includes(SolidityType.int)) {
            const numberType = this.buildEtherjsNumberType(
              abiOutput.type,
              SolidityType.int
            );

            if (abiOutput.type.includes('[')) {
              return this.buildUpMultidimensionalArrayTypes(
                abiOutput.type,
                numberType
              );
            }

            return numberType;
          }
        }
      }
    }

    if (abiOutput.type.includes(SolidityType.tuple)) {
      const interfaceName = this.buildInterfaceName(abiOutput);
      if (abiOutput.type.includes('[')) {
        return `${interfaceName}[]`;
      }

      return interfaceName;
    }

    if (abiOutput.type.includes(SolidityType.bool)) {
      if (abiOutput.type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(
          abiOutput.type,
          'boolean'
        );
      }
      return 'boolean';
    }

    if (
      abiOutput.type.includes(SolidityType.address) ||
      abiOutput.type.includes(SolidityType.string) ||
      abiOutput.type.includes(SolidityType.bytes) ||
      abiOutput.type.includes(SolidityType.uint) ||
      abiOutput.type.includes(SolidityType.int)
    ) {
      if (abiOutput.type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(abiOutput.type, 'string');
      }

      return 'string';
    }

    throw new Error(`${abiOutput.type} is not valid solidty type 1`);
  }

  /**
   * Build response interface name
   * @param inputOrOutput The input or output
   */
  public static buildInterfaceName(
    inputOrOutput: AbiOutput | AbiInput,
    requestInterfaceType:
      | 'Request'
      | 'Response'
      | 'EventEmittedResponse' = 'Response'
  ): string {
    if (inputOrOutput.name.length > 0) {
      return `${Helpers.capitalize(inputOrOutput.name)}${requestInterfaceType}`;
    }

    if (!inputOrOutput.internalType) {
      throw new Error(
        `All tuple types need a name or a internal type else the tool can not generate static naming for the responses please check all your tuple and tuple[] have got a name or a internal type. - ${JSON.stringify(
          inputOrOutput
        )}`
      );
    }

    const internalType = Helpers.deepClone(inputOrOutput.internalType!);

    return `${Helpers.capitalize(
      internalType
        .substring(internalType.indexOf('.'))
        .toLowerCase()
        .replace('struct', '')
        .replace('.', '')
        .replace('[', '')
        .replace(']', '')
        .replace(/\s/g, '')
    )}Response`;
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

  /**
   * Check is a path is a directory
   * @param pathValue The path value
   */
  public static isDirectory(pathValue: string): boolean {
    return fs.existsSync(pathValue) && fs.lstatSync(pathValue).isDirectory();
  }

  /**
   * Build the executing path
   */
  public static buildExecutingPath(joinPath: string): string {
    return path.resolve(process.cwd(), joinPath);
  }
}

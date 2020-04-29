import { SolidityType } from '../../../abi-properties';

export default class TypeScriptHelpers {
  /**
   * Get the solidity type mapped to typescript type (map out all types!!!)
   * @param type The solidity type
   */
  public static getSolidityTsType(type: string) {
    if (type.includes(SolidityType.bool)) {
      if (type.includes('[')) {
        return this.buildUpMultidimensionalArrayTypes(type, 'boolean');
      }
      return 'boolean';
    } else if (
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
  ) {
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
   * Build enum
   * @param enumName The enum name
   * @param enumMembers The enum members
   */
  public static buildEnum(enumName: string, enumContext: string): string {
    return `export enum ${enumName} { ${enumContext} }`;
  }
}

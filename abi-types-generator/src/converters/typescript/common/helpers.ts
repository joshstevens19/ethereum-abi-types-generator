import { SolidityType } from '../../../abi-properties';

export default class TypeScriptHelpers {
  /**
   * Get the solidity type mapped to typescript type
   * @param type
   */
  public static getSolidityTsType(type: SolidityType) {
    switch (type) {
      case SolidityType.address:
      case SolidityType.bytes32:
      case SolidityType.uint256:
        return 'string';
      case SolidityType.bool:
        return 'boolean';
      default:
        throw new Error(`${type} is not a whitelisted input output type`);
    }
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

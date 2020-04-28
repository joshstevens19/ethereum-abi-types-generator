import { AbiItem, AbiItemType } from '../../abi-properties';

export class EthersFactory {
  constructor() {}

  /**
   * Build ethers generic interfaces
   */
  public buildEthersInterfaces(abiName: string): string {
    const ethersImports = `import { ContractTransaction } from "ethers";
      import { EthersContractContext } from "ethereum-abi-types-generator";
      `;

    const ethersContractContextType = `export type ContractContext = EthersContractContext<
      ${abiName},
      ${abiName}EventsContext,
      ${abiName}Events
    >;
    `;

    const eventFilter = `export declare type EventFilter = {
        address?: string;
        topics?: Array<string>;
        fromBlock?: string | number;
        toBlock?: string | number;
      };
    `;

    return ethersImports + ethersContractContextType + eventFilter;
  }

  /**
   * Build event interface properties
   * @param abiItems The abi json
   */
  public buildEventInterfaceProperties(abiItems: AbiItem[]): string {
    let eventPropeties = '';

    for (let i = 0; i < abiItems.length; i++) {
      if (abiItems[i].type === AbiItemType.event) {
        eventPropeties += `${abiItems[i].name}(...parameters: any): EventFilter;`;
      }
    }

    return eventPropeties;
  }

  /**
   * Build the method return context
   * @param type The type it returns
   * @param abiItem The abi item
   */
  public buildMethodReturnContext(type: any, abiItem: AbiItem) {
    if (abiItem.constant === true) {
      return `: Promise<${type}>`;
    }

    if (abiItem.payable === true) {
      return `: Promise<ContractTransaction>`;
    }

    return `: Promise<ContractTransaction>`;
  }
}

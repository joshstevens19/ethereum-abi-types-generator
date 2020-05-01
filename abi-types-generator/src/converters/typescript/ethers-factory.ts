import { AbiItem, AbiItemType } from '../../abi-properties';

export class EthersFactory {
  constructor() {}

  /**
   * Build ethers generic interfaces
   */
  public buildEthersInterfaces(abiName: string): string {
    return `
      import { ContractTransaction } from "ethers";
      import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
      import { EthersContractContext } from "ethereum-abi-types-generator";

      export type ContractContext = EthersContractContext<
        ${abiName},
        ${abiName}EventsContext,
        ${abiName}Events
      >;

      export declare type EventFilter = {
        address?: string;
        topics?: Array<string>;
        fromBlock?: string | number;
        toBlock?: string | number;
      };
    `;
  }

  /**
   * Build event interface properties
   * @param abiItems The abi json
   */
  public buildEventInterfaceProperties(abiItems: AbiItem[]): string {
    let eventPropeties = '';

    for (let i = 0; i < abiItems.length; i++) {
      if (abiItems[i].type === AbiItemType.event) {
        // TODO make parameters strongly typed if i can
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
  public buildMethodReturnContext(type: string, abiItem: AbiItem): string {
    if (abiItem.constant === true) {
      return `: Promise<${type}>`;
    }

    return `: Promise<ContractTransaction>`;
  }
}

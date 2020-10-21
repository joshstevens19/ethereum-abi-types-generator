import { AbiItem, AbiItemType } from '../../abi-properties';
import Helpers from '../../common/helpers';
import { EthersVersion } from './enums/ethers-version';

export class EthersFactory {
  constructor() {}

  /**
   * Build ethers generic interfaces
   */
  public buildEthersInterfaces(
    abiName: string,
    ethersVersion: EthersVersion
  ): string {
    return `${this.getEthersImports(abiName, ethersVersion)}

      export declare type EventFilter = {
        address?: string;
        topics?: Array<string>;
        fromBlock?: string | number;
        toBlock?: string | number;
      };

      export interface ContractTransactionOverrides {
         /**
         * The maximum units of gas for the transaction to use
         */
         gasLimit?: number;
        /**
         * The price (in wei) per unit of gas
         */
         gasPrice?: BigNumber | string | number | Promise<any>;
        /**
         * The nonce to use in the transaction
         */
         nonce?: number;
        /**
         * The amount to send with the transaction (i.e. msg.value)
         */
         value?: BigNumber | string | number | Promise<any>;
        /**
         * The chain ID (or network ID) to use
         */
         chainId?: number;
      }

       export interface ContractCallOverrides {
         /**
         * The address to execute the call as
         */
         from?: string;
        /**
         * The maximum units of gas for the transaction to use
         */
         gasLimit?: number;
      }
    `;
  }

  /**
   * Get ethers imports by version number
   * @param abiName The abi name
   * @param ethersVersion The ethers version
   */
  private getEthersImports(
    abiName: string,
    ethersVersion: EthersVersion
  ): string {
    switch (ethersVersion) {
      case EthersVersion.four_or_below:
        return `
          import { ContractTransaction } from "ethers";
          import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
          import { EthersContractContext } from "ethereum-abi-types-generator";

          export type ContractContext = EthersContractContext<
            ${abiName},
            ${abiName}EventsContext,
            ${abiName}Events
          >;
        `;
      case EthersVersion.five:
        return `
           import { ContractTransaction,
                    ContractInterface,
                    BytesLike as Arrayish,
                    BigNumber,
                    BigNumberish } from "ethers";
           import { EthersContractContextV5 } from "ethereum-abi-types-generator";

           export type ContractContext = EthersContractContextV5<
            ${abiName},
            ${abiName}MethodNames,
            ${abiName}EventsContext,
            ${abiName}Events
           >;
        `;
      default:
        throw new Error(`Unsupported ethers version ${ethersVersion}`);
    }
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
    if (Helpers.isNeverModifyBlockchainState(abiItem)) {
      return `: Promise<${type}>`;
    }

    return `: Promise<ContractTransaction>`;
  }

  /**
   * Add overrides to the parameters - https://docs.ethers.io/ethers.js/html/api-contract.html#overrides
   * @param parameters The parameters
   * @param abiItem The abi items
   */
  public addOverridesToParameters(
    parameters: string,
    abiItem: AbiItem
  ): string {
    // take into consideration the `(` defined at the start
    if (parameters.length > 1) {
      parameters += ', ';
    }

    if (Helpers.isNeverModifyBlockchainState(abiItem)) {
      return (parameters += 'overrides?: ContractCallOverrides');
    }

    return (parameters += 'overrides?: ContractTransactionOverrides');
  }
}

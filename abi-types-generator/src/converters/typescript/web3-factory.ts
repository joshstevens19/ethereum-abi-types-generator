import { AbiItem, AbiItemType } from '../../abi-properties';
import Helpers from '../../common/helpers';
import TypeScriptHelpers from './common/helpers';
import { Provider } from './enums/provider';

export class Web3Factory {
  constructor() {}

  /**
   * Build web3 genertic interfaces
   */
  public buildWeb3Interfaces(abiName: string): string {
    return `import BN from "bn.js";
    import BigNumber from 'bignumber.js';
    import { PromiEvent, TransactionReceipt, EventResponse, EventData, Web3ContractContext } from "ethereum-abi-types-generator";

    export interface CallOptions {
        from?: string;
        gasPrice?: string;
        gas?: number;
    }

    export interface SendOptions {
        from: string;
        value?: number | string | BN | BigNumber;
        gasPrice?: string;
        gas?: number;
    }

    export interface EstimateGasOptions {
        from?: string;
        value?: number | string | BN | BigNumber;
        gas?: number;
    }

    export interface MethodPayableReturnContext {
        send(options: SendOptions):PromiEvent<TransactionReceipt>;
        send(
            options: SendOptions,
            callback: (error: Error, result: any) => void
        ): PromiEvent<TransactionReceipt>;
        estimateGas(options: EstimateGasOptions): Promise<number>;
        estimateGas(
            options: EstimateGasOptions,
            callback: (error: Error, result: any) => void
        ): Promise<number>;
        encodeABI(): string;
    }

    export interface MethodConstantReturnContext<TCallReturn> {
        call(): Promise<TCallReturn>;
        call(options: CallOptions): Promise<TCallReturn>;
        call(
        options: CallOptions,
        callback: (error: Error, result: TCallReturn) => void
        ): Promise<TCallReturn>;
        encodeABI(): string;
    }

    export interface MethodReturnContext extends MethodPayableReturnContext {}

    export type ContractContext = Web3ContractContext<
      ${abiName},
      ${abiName}MethodNames,
      ${abiName}EventsContext,
      ${abiName}Events
    >;
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
        let filtersProperties = '{';
        for (let a = 0; a < abiItems[i].inputs!.length; a++) {
          if (abiItems[i].inputs![a].indexed === true) {
            const paramterType = TypeScriptHelpers.getSolidityInputTsType(
              abiItems[i].inputs![a],
              Provider.web3
            );
            filtersProperties += `${
              abiItems[i].inputs![a].name
            }?: ${paramterType} | ${paramterType}[],`;
          }
        }

        filtersProperties += '}';

        const parameters = `
         {
             filter?: ${filtersProperties};
             fromBlock?: number;
             toBlock?: 'latest' | number;
             topics?: string[]
         }
         `;

        eventPropeties += `${abiItems[i].name}(parameters: ${parameters}, callback?: (error: Error, event: EventData) => void): EventResponse;`;
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
      return `: MethodConstantReturnContext<${type}>`;
    }

    if (Helpers.isAcceptsEther(abiItem)) {
      return `: MethodPayableReturnContext`;
    }

    return `: MethodReturnContext`;
  }
}

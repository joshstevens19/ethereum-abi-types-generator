import { AbiItem, AbiItemType } from '../../abi-properties';
import TypeScriptHelpers from './common/helpers';
import { Provider } from './enums/provider';

export class Web3Factory {
  constructor() {}

  /**
   * Build web3 genertic interfaces
   */
  public buildWeb3Interfaces(abiName: string): string {
    const bnImport = 'import BN from "bn.js";';

    const web3Imports =
      'import { PromiEvent, TransactionReceipt, EventResponse, EventData, Web3ContractContext } from "ethereum-abi-types-generator";';

    const methodReturnContextOptions = `export interface CallOptions {
        from?: string;
        gasPrice?: string;
        gas?: number;
    }
    
    export interface SendOptions {
        from: string;
        value?: number | string | BN;
        gasPrice?: string;
        gas?: number;
    }

    export interface EstimateGasOptions {
        from?: string;
        value?: number | string | BN;
        gas?: number;
    }
    `;

    const methodPayableReturnContext = `export interface MethodPayableReturnContext {
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
    }`;

    const methodConstantReturnContext = `export interface MethodConstantReturnContext<TCallReturn> {
        call(): Promise<TCallReturn>;
        call(options: CallOptions): Promise<TCallReturn>;
        call(
        options: CallOptions,
        callback: (error: Error, result: TCallReturn) => void
        ): Promise<TCallReturn>;
    }`;

    const methodReturnContext = `export interface MethodReturnContext extends MethodPayableReturnContext {}`;

    const web3ContractContextType = `export type ContractContext = Web3ContractContext<
      ${abiName},
      ${abiName}MethodNames,
      ${abiName}EventsContext,
      ${abiName}Events
    >;
    `;

    return (
      bnImport +
      web3Imports +
      methodReturnContextOptions +
      methodPayableReturnContext +
      methodConstantReturnContext +
      methodReturnContext +
      web3ContractContextType
    );
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
              abiItems[i].inputs![a].type,
              Provider.web3
            );
            filtersProperties += `${
              abiItems[i].inputs![a].name
            }?: ${paramterType} | ${paramterType}[],`;
          }
        }

        filtersProperties += '}';

        let parameters = `
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
  public buildMethodReturnContext(type: any, abiItem: AbiItem) {
    if (abiItem.constant === true) {
      return `: MethodConstantReturnContext<${type}>`;
    }

    if (abiItem.payable === true) {
      return `: MethodPayableReturnContext`;
    }

    return `: MethodReturnContext`;
  }
}

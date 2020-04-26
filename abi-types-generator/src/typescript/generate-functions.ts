import fs from 'fs-extra';
import { AbiInput, AbiItem } from '../abi-properties/abi-item';
import { AbiItemType } from '../abi-properties/abi-item-type';
import { InputOutputType } from '../abi-properties/input-output-type';
import Helpers from '../common/helpers';

export default class GenerateFunctions {
  private _objectOutputReturnTypeInterfaces: string[] = [];
  private _events: string[] = [];
  private _methodNames: string[] = [];

  constructor() {}

  public buildInterfaceFromFunctions() {
    const result: AbiItem[] = JSON.parse(
      fs.readFileSync('./abi-examples/factory-abi.json', 'utf8')
    );

    const methodReturnContextOptions = `export interface CallOptions {
        from?: string;
        gasPrice?: string;
        gas?: number;
    }
    
    export interface SendOptions {
        from: string;
        value: number | string; // | BN;
        gasPrice?: string;
        gas?: number;
    }

    export interface EstimateGasOptions {
        from?: string;
        value?: number | string; // | BN;
        gas?: number;
    }
    `;

    const methodPayableReturnContext = `export interface MethodPayableReturnContext {
        send(options: SendOptions): Promise<any>;
        send(
            options: SendOptions,
            callback: (error: Error, result: any) => void
        ): Promise<any>;
        estimateGas(options: EstimateGasOptions): Promise<any>;
        estimateGas(
            options: EstimateGasOptions,
            callback: (error: Error, result: any) => void
        ): Promise<any>;
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

    let abiContext = `
      export interface FactoryAbi { 
        `;
    for (let i = 0; i < result.length; i++) {
      switch (result[i].type) {
        case AbiItemType.constructor:
          abiContext += this.buildInterfacePropertyMainSummary(result[i]);
          this._methodNames.push('new');
          abiContext += `'new'${this.workOutInputParameters(result[i])};`;
          break;
        case AbiItemType.function:
          abiContext += this.buildInterfacePropertyMainSummary(result[i]);
          this._methodNames.push(result[i].name!);
          abiContext += `${result[i].name}${this.workOutInputParameters(
            result[i]
          )};`;
          break;
        case AbiItemType.event:
          this._events.push(result[i].name!);
          break;
      }
    }

    abiContext += ' }';
    console.log(abiContext);

    // write the object interfaces to types
    let objectOutputInterfacesContext = '';
    for (let o = 0; o < this._objectOutputReturnTypeInterfaces.length; o++) {
      objectOutputInterfacesContext += this._objectOutputReturnTypeInterfaces[
        o
      ];
    }

    const fullInterface =
      methodReturnContextOptions +
      methodPayableReturnContext +
      methodConstantReturnContext +
      methodReturnContext +
      this.buildEventsEnum() +
      this.buildEventsInterface(result) +
      this.buildMethodNamesEnum() +
      objectOutputInterfacesContext +
      abiContext;

    fs.writeFileSync('./abi-examples/factory.ts', fullInterface, {
      mode: 0o755,
    });
  }

  private buildMethodNamesEnum(): string {
    let methodNames = 'export enum FactoryAbiMethodNames {';

    for (let i = 0; i < this._methodNames.length; i++) {
      methodNames += `${this._methodNames[i]} = "${this._methodNames[i]}",`;
    }

    methodNames += '}';

    return methodNames;
  }

  /**
   * Build events enum
   */
  private buildEventsEnum(): string {
    let events = 'export enum AbiEvents {';

    for (let i = 0; i < this._events.length; i++) {
      events += `${this._events[i]} = "${this._events[i]}",`;
    }

    events += '}';

    return events;
  }

  private buildEventsInterface(abiItems: AbiItem[]) {
    let eventsInterface = 'export interface EventsContext {';

    for (let i = 0; i < abiItems.length; i++) {
      if (abiItems[i].type === AbiItemType.event) {
        let filtersProperties = '{';
        for (let a = 0; a < abiItems[i].inputs!.length; a++) {
          if (abiItems[i].inputs![a].indexed === true) {
            const paramterType = this.getInputOutputTsType(
              abiItems[i].inputs![a].type as InputOutputType
            );
            filtersProperties += `${
              abiItems[i].inputs![a].name
            }: ${paramterType} | ${paramterType}[],`;
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

        eventsInterface += `${abiItems[i]
          .name!}(parameters: ${parameters}): any;`;
      }
    }

    eventsInterface += '}';

    return eventsInterface;
  }

  private buildInterfacePropertyMainSummary(abiItem: AbiItem) {
    let paramsDocs = '';

    if (abiItem.inputs) {
      for (let i = 0; i < abiItem.inputs.length; i++) {
        let inputName = abiItem.inputs[i].name;
        // handle mapping inputs
        if (inputName.length === 0) {
          inputName = `parameter${i}`;
        }

        paramsDocs += `\r\n* @param ${inputName} Type: ${
          abiItem.inputs[i].type
        }, Indexed: ${abiItem.inputs[i].indexed || 'false'}`;
      }
    }

    return `
         /**
            * Payable: ${abiItem.payable}
            * Constant: ${abiItem.constant}
            * StateMutability: ${abiItem.stateMutability}
            * Type: ${abiItem.type} ${paramsDocs}
          */
        `;
  }

  /**
   *
   * @param abiItem
   */
  private workOutInputParameters(abiItem: AbiItem) {
    let input = '(';
    if (abiItem.inputs) {
      for (let i = 0; i < abiItem.inputs.length; i++) {
        if (input.length > 1) {
          input += ', ';
        }

        let inputName = abiItem.inputs[i].name;
        // handle mapping inputs
        if (inputName.length === 0) {
          inputName = `parameter${i}`;
        }

        if (abiItem.inputs[i].type === InputOutputType.tuple) {
          input += `${inputName}: ${this.buildTupleInputInterface(
            abiItem.name!,
            abiItem.inputs[i]
          )}`;
        } else {
          input += `${inputName}: ${this.getInputOutputTsType(
            abiItem.inputs[i].type as InputOutputType
          )}`;
        }
      }

      input += `)${this.workOutReturnContext(abiItem)}`;

      return input;
    }
  }

  private getInputOutputTsType(type: InputOutputType) {
    switch (type) {
      case InputOutputType.address:
      case InputOutputType.bytes32:
      case InputOutputType.uint256:
        return 'string';
      case InputOutputType.bool:
        return 'boolean';
    }
  }

  private buildTupleInputInterface(name: string, abiInput: AbiInput): string {
    const interfaceName = `${Helpers.capitalize(name)}Request`;

    let returnTypeInterface = `export interface ${interfaceName} { `;

    for (let i = 0; i < abiInput.components!.length; i++) {
      returnTypeInterface += `${
        abiInput.components![i].name
      }: ${this.getInputOutputTsType(
        abiInput.components![i].type as InputOutputType
      )};`;
    }

    returnTypeInterface += '}';

    this._objectOutputReturnTypeInterfaces.push(returnTypeInterface);

    return `${interfaceName}[]`;
  }

  private workOutReturnContext(abiItem: AbiItem) {
    let output = '';

    if (abiItem.outputs && abiItem.outputs.length > 0) {
      if (abiItem.outputs.length === 1) {
        output += this.buildMockReturnContext(
          this.getOutTsType(abiItem.outputs[0].type as InputOutputType),
          abiItem
        );
      } else {
        const objectOutputReturnTypeInterfaceName = `${Helpers.capitalize(
          abiItem.name!
        )}Response`;
        let objectOutputReturnTypeInterface = `export interface ${objectOutputReturnTypeInterfaceName} { `;

        for (let i = 0; i < abiItem.outputs.length; i++) {
          objectOutputReturnTypeInterface += `${
            abiItem.outputs[i].name
          }: ${this.getInputOutputTsType(
            abiItem.outputs[i].type as InputOutputType
          )};`;
        }

        objectOutputReturnTypeInterface += '}';

        this._objectOutputReturnTypeInterfaces.push(
          objectOutputReturnTypeInterface
        );

        output += this.buildMockReturnContext(
          objectOutputReturnTypeInterfaceName,
          abiItem
        );
      }
    } else {
      output += this.buildMockReturnContext('void', abiItem);
    }

    return output;
  }

  private buildMockReturnContext(type: any, abiItem: AbiItem) {
    if (abiItem.constant === true) {
      return `: MethodConstantReturnContext<${type}>`;
    }

    if (abiItem.payable === true) {
      return `: MethodPayableReturnContext`;
    }

    return `: MethodReturnContext`;
  }

  /**
   * Work out is the abit item is a mapping or public getter
   * @param abiItem
   */
  private isAMappingOrPublicGetter(abiItem: AbiItem) {
    if (abiItem.inputs === undefined) {
      return false;
    }

    return abiItem.inputs.find((i) => i.name.length === 0) !== undefined;
  }

  private getOutTsType(type: InputOutputType): string {
    switch (type) {
      case InputOutputType.address:
      case InputOutputType.bytes32:
      case InputOutputType.uint256:
        return 'string';
      case InputOutputType.bool:
        return 'boolean';
      default:
        throw new Error(`${type} is not a whitelisted input output type`);
    }
  }
}

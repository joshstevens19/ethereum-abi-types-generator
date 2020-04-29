import fs from 'fs-extra';
import path from 'path';
import prettier, { Options } from 'prettier';
import { AbiInput, AbiOutput, SolidityType } from '../../abi-properties';
import { AbiItem } from '../../abi-properties/abi-item';
import { AbiItemType } from '../../abi-properties/abi-item-type';
import Helpers from '../../common/helpers';
import Logger from '../../common/logger';
import TypeScriptHelpers from './common/helpers';
import { GeneratorContext } from './contexts/generator-context';
import { Provider } from './enums/provider';
import { EthersFactory } from './ethers-factory';
import { Web3Factory } from './web3-factory';

export default class AbiGenerator {
  private _web3Factory = new Web3Factory();
  private _ethersFactory = new EthersFactory();

  // the contexts
  private _parametersAndReturnTypeInterfaces: string[] = [];
  private _events: string[] = [];
  private _methodNames: string[] = [];

  constructor(private _context: GeneratorContext) {}

  /**
   * Generates all the typings
   * @returns The location the file was generated to
   */
  public generate(): string {
    if (!this.isDirectory(this.getOutputPathDirectory())) {
      throw new Error('output path must be a directory');
    }

    const abi: AbiItem[] = this.getAbiJson();

    const fullTypings = this.buildFullTypings(abi, this.buildAbiInterface(abi));
    let fullTypingsFormatted: string;

    try {
      fullTypingsFormatted = prettier.format(
        fullTypings,
        this.getPrettierOptions()
      );
    } catch (error) {
      // users probably not supplied the correct prettier options
      // fallback to default

      Logger.error(
        'Your prettier options were not valid so falling back to default one.'
      );
      Logger.log('');

      fullTypingsFormatted = prettier.format(
        fullTypings,
        this.getDefaultPrettierOptions()
      );
    }

    const outputLocation = this.buildOutputLocation();

    fs.writeFileSync(outputLocation, fullTypingsFormatted, {
      mode: 0o755,
    });

    return outputLocation;
  }

  /**
   * Get the output path directory
   */
  private getOutputPathDirectory(): string {
    if (this._context.outputPathDirectory) {
      return this._context.outputPathDirectory;
    }

    return path.dirname(this._context.abiFileLocation);
  }

  /**
   * Build output location
   */
  private buildOutputLocation(): string {
    const name = this._context.name || this.getAbiFileLocationRawName();

    const outputPathDirectory = this.getOutputPathDirectory();

    if (outputPathDirectory.substring(outputPathDirectory.length - 1) === '/') {
      return `${outputPathDirectory}${name}.ts`;
    }

    return `${outputPathDirectory}/${name}.ts`;
  }

  /**
   * Get prettier options
   */
  private getPrettierOptions(): Options {
    if (this._context.prettierOptions) {
      this._context.prettierOptions.parser = 'typescript';
      return this._context.prettierOptions;
    }

    return this.getDefaultPrettierOptions();
  }

  /**
   * Get default prettier options
   */
  private getDefaultPrettierOptions(): Options {
    return {
      parser: 'typescript',
      trailingComma: 'es5',
      singleQuote: true,
      bracketSpacing: true,
      printWidth: 80,
    };
  }

  /**
   * Build the full typings
   * @param abi The abi items
   * @param abiTypedInterface The abi typed interface
   */
  private buildFullTypings(abi: AbiItem[], abiTypedInterface: string): string {
    let typings = '';
    switch (this._context.provider) {
      case Provider.web3:
        typings += this._web3Factory.buildWeb3Interfaces(this.getAbiName());
        break;
      case Provider.ethers:
        typings += this._ethersFactory.buildEthersInterfaces(this.getAbiName());
        break;
      default:
        throw new Error(
          `${this._context.provider} is not a known supported provider`
        );
    }

    return (
      typings +
      this.buildEventsEnum() +
      this.buildEventsInterface(abi) +
      this.buildMethodNamesEnum() +
      this.buildParametersAndReturnTypeInterfaces() +
      abiTypedInterface
    );
  }

  /**
   * Gets the abi json
   */
  private getAbiJson(): AbiItem[] {
    if (!fs.existsSync(this._context.abiFileLocation)) {
      throw new Error(`can not find abi file ${this._context.abiFileLocation}`);
    }

    try {
      const result: AbiItem[] = JSON.parse(
        fs.readFileSync(this._context.abiFileLocation, 'utf8')
      );

      return result;
    } catch (error) {
      throw new Error(
        `Abi file ${this._context.abiFileLocation} is not a json file. Abi must be a json file.`
      );
    }
  }

  /**
   * Check is a path is a directory
   * @param pathValue The path value
   */
  private isDirectory(pathValue: string) {
    return fs.existsSync(pathValue) && fs.lstatSync(pathValue).isDirectory();
  }

  /**
   * Build abi interface
   * @param abi The abi json
   */
  private buildAbiInterface(abi: AbiItem[]): string {
    let properties = '';

    for (let i = 0; i < abi.length; i++) {
      switch (abi[i].type) {
        case AbiItemType.constructor:
          properties += this.buildInterfacePropertyDocs(abi[i]);
          this._methodNames.push('new');
          properties += `'new'${this.buildParametersAndReturnTypes(abi[i])};`;
          break;
        case AbiItemType.function:
          properties += this.buildInterfacePropertyDocs(abi[i]);
          this._methodNames.push(abi[i].name);
          properties += `${abi[i].name}${this.buildParametersAndReturnTypes(
            abi[i]
          )};`;
          break;
        case AbiItemType.event:
          this._events.push(abi[i].name);
          break;
      }
    }

    return TypeScriptHelpers.buildInterface(this.getAbiName(), properties);
  }

  /**
   * Get abi name
   */
  private getAbiName(): string {
    if (this._context.name) {
      return this.formatAbiName(this._context.name);
    }

    return this.formatAbiName(this.getAbiFileLocationRawName());
  }

  /**
   * Formats the abi name
   * @param name
   */
  private formatAbiName(name: string) {
    return name
      .split('-')
      .map((value) => Helpers.capitalize(value))
      .join('')
      .split('.')
      .map((value) => Helpers.capitalize(value))
      .join('');
  }

  /**
   * Get abi file location raw name
   */
  private getAbiFileLocationRawName(): string {
    const basename = path.basename(this._context.abiFileLocation);
    return basename.split('.')[0];
  }

  /**
   * Build method names enum
   */
  private buildMethodNamesEnum(): string {
    let members = '';

    this._methodNames.map((method) => {
      members += `${method} = "${method}",`;
    });

    return TypeScriptHelpers.buildEnum(
      `${this.getAbiName()}MethodNames`,
      members
    );
  }

  /**
   * Build the parameters and return type interface if they accept an object of some form
   */
  private buildParametersAndReturnTypeInterfaces(): string {
    let objectOutputReturnType = '';

    this._parametersAndReturnTypeInterfaces.map((typeInterface) => {
      objectOutputReturnType += typeInterface;
    });

    return objectOutputReturnType;
  }

  /**
   * Build events enum
   */
  private buildEventsEnum(): string {
    let members = '';

    this._events.map((event) => {
      members += `${event} = "${event}",`;
    });

    return TypeScriptHelpers.buildEnum(`${this.getAbiName()}Events`, members);
  }

  /**
   * Build the event context interface
   * @param abiItems The abi json
   */
  private buildEventsInterface(abiItems: AbiItem[]): string {
    const eventsInterfaceName = `${this.getAbiName()}EventsContext`;

    switch (this._context.provider) {
      case Provider.web3:
        return TypeScriptHelpers.buildInterface(
          eventsInterfaceName,
          this._web3Factory.buildEventInterfaceProperties(abiItems)
        );
      case Provider.ethers:
        return TypeScriptHelpers.buildInterface(
          eventsInterfaceName,
          this._ethersFactory.buildEventInterfaceProperties(abiItems)
        );
      default:
        throw new Error(
          `${this._context.provider} is not a known supported provider. Supported providers are ethers or web3`
        );
    }
  }

  /**
   * Build the abi property summaries
   * @param abiItem The abi json
   */
  private buildInterfacePropertyDocs(abiItem: AbiItem): string {
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
   * Builds the input and output property type
   * @param abiItem The abi json
   */
  private buildParametersAndReturnTypes(abiItem: AbiItem): string {
    let parameters = this.buildParameters(abiItem);
    return `${parameters}${this.buildPropertyReturnTypeInterface(abiItem)}`;
  }

  /**
   * Build parameters for abi interface
   * @param abiItem The abi item
   */
  private buildParameters(abiItem: AbiItem): string {
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

        if (abiItem.inputs[i].type === SolidityType.tuple) {
          input += `${inputName}: ${this.buildTupleParametersInterface(
            abiItem.name,
            abiItem.inputs[i]
          )}`;
        } else {
          input += `${inputName}: ${TypeScriptHelpers.getSolidityTsType(
            abiItem.inputs[i].type
          )}`;
        }
      }
    }

    return (input += ')');
  }

  /**
   * Build the object request parameter interface
   * @param name The abi item name
   * @param abiInput The abi input
   */
  private buildTupleParametersInterface(
    name: string,
    abiInput: AbiInput
  ): string {
    const interfaceName = `${Helpers.capitalize(name)}Request`;

    let properties = '';

    for (let i = 0; i < abiInput.components!.length; i++) {
      properties += `${
        abiInput.components![i].name
      }: ${TypeScriptHelpers.getSolidityTsType(abiInput.components![i].type)};`;
    }

    this._parametersAndReturnTypeInterfaces.push(
      TypeScriptHelpers.buildInterface(interfaceName, properties)
    );

    return `${interfaceName}[]`;
  }

  /**
   * Build property return type interface and return the return type context
   * @param abiItem The abit json
   */
  private buildPropertyReturnTypeInterface(abiItem: AbiItem): string {
    let output = '';

    if (abiItem.outputs && abiItem.outputs.length > 0) {
      if (abiItem.outputs.length === 1) {
        output += this.buildMethodReturnContext(
          TypeScriptHelpers.getSolidityTsType(abiItem.outputs[0].type),
          abiItem
        );
      } else {
        const interfaceName = `${Helpers.capitalize(abiItem.name)}Response`;

        let ouputProperties = '';

        abiItem.outputs.map((output: AbiOutput) => {
          ouputProperties += `${
            output.name
          }: ${TypeScriptHelpers.getSolidityTsType(output.type)};`;
        });

        this._parametersAndReturnTypeInterfaces.push(
          TypeScriptHelpers.buildInterface(interfaceName, ouputProperties)
        );

        output += this.buildMethodReturnContext(interfaceName, abiItem);
      }
    } else {
      output += this.buildMethodReturnContext('void', abiItem);
    }

    return output;
  }

  /**
   * Build the method return context
   * @param type The type it returns
   * @param abiItem The abi item
   */
  private buildMethodReturnContext(type: any, abiItem: AbiItem) {
    switch (this._context.provider) {
      case Provider.web3:
        return this._web3Factory.buildMethodReturnContext(type, abiItem);
      case Provider.ethers:
        return this._ethersFactory.buildMethodReturnContext(type, abiItem);
      default:
        throw new Error(
          `${this._context.provider} is not a known supported provider`
        );
    }
  }
}

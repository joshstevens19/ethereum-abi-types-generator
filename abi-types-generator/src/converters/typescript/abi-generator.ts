import fs from 'fs-extra';
import path from 'path';
import { Options } from 'prettier';
import prettierTS from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';
import { AbiInput, AbiOutput, SolidityType } from '../../abi-properties';
import { AbiItem } from '../../abi-properties/abi-item';
import { AbiItemType } from '../../abi-properties/abi-item-type';
import Helpers from '../../common/helpers';
import { Logger } from '../../common/logger';
import TypeScriptHelpers from './common/helpers';
import { GeneratorContext } from './contexts/generator-context';
import { EthersVersion } from './enums/ethers-version';
import { Provider } from './enums/provider';
import { EthersFactory } from './ethers-factory';
import { GenerateResponse } from './models/generate-response';
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
  public generate(): GenerateResponse {
    this.clearAllQuotesFromContextInfo();
    if (!TypeScriptHelpers.isDirectory(this.getOutputPathDirectory())) {
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

    this.clearState();

    if (this._context.watch) {
      this.watchForChanges();
    }

    return {
      outputLocation,
      abiJsonFileLocation: this.getAbiFileFullPathLocation(),
    };
  }

  /**
   * Clear all quotes from the context file info
   */
  private clearAllQuotesFromContextInfo(): void {
    this._context.abiFileLocation = this._context.abiFileLocation.replace(
      /\'/g,
      ''
    );
    if (this._context.outputPathDirectory) {
      this._context.outputPathDirectory = this._context.outputPathDirectory.replace(
        /\'/g,
        ''
      );
    }
  }

  /**
   * Clear the state down
   */
  private clearState(): void {
    this._parametersAndReturnTypeInterfaces = [];
    this._events = [];
    this._methodNames = [];
  }

  /**
   * Watch for ABI file changes
   */
  private watchForChanges(): void {
    // dont let anymore watches happen once the first one is registered
    this._context.watch = false;
    let fsWait = false;
    fs.watch(this.getAbiFileFullPathLocation(), (event, filename) => {
      if (filename) {
        if (fsWait) return;
        setTimeout(() => {
          fsWait = false;
        }, 100);

        const outputLocation = this.generate();
        Logger.log(
          `successfully updated typings for abi file ${this.getAbiFileFullPathLocation()} saved in ${outputLocation}`
        );
      }
    });
  }

  /**
   * Get the output path directory
   */
  private getOutputPathDirectory(): string {
    if (this._context.outputPathDirectory) {
      return this._context.outputPathDirectory;
    }

    return path.dirname(this.getAbiFileFullPathLocation());
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

    return this.buildExecutingPath(`${outputPathDirectory}/${name}.ts`);
  }

  /**
   * Get prettier options
   */
  private getPrettierOptions(): Options {
    const usersPrettierrConfig = this.findPrettierrcContent(
      this.buildExecutingPath(this.getOutputPathDirectory())
    );
    if (usersPrettierrConfig) {
      usersPrettierrConfig.parser = 'typescript';
      usersPrettierrConfig.plugins = [prettierTS];
      return usersPrettierrConfig;
    }

    return this.getDefaultPrettierOptions();
  }

  /**
   * Loop through all the of dir to try to fine the .prettierrc file
   * @param dirPath The path
   */
  private findPrettierrcContent(dirPath: string): Options | null {
    const files = fs.readdirSync(dirPath);
    for (let i = 0; i < files.length; i++) {
      if (files[i] === '.prettierrc') {
        try {
          return JSON.parse(
            fs.readFileSync(path.join(dirPath, '.prettierrc'), 'utf8')
          ) as Options;
        } catch (error) {
          // mute it
        }
      }
    }

    const nextPath = path.join(dirPath, '..');
    if (nextPath !== dirPath) {
      return this.findPrettierrcContent(nextPath);
    }

    return null;
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
      plugins: [prettierTS],
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
        typings += this._ethersFactory.buildEthersInterfaces(
          this.getAbiName(),
          EthersVersion.four_or_below
        );
        break;
      case Provider.ethers_v5:
        typings += this._ethersFactory.buildEthersInterfaces(
          this.getAbiName(),
          EthersVersion.five
        );
        break;
      default:
        throw new Error(
          `${this._context.provider} is not a known supported provider`
        );
    }

    return (
      typings +
      this.buildEventsType() +
      this.buildEventsInterface(abi) +
      this.buildMethodNamesType() +
      this.buildParametersAndReturnTypeInterfaces() +
      abiTypedInterface
    );
  }

  /**
   * Gets the abi json
   */
  private getAbiJson(): AbiItem[] {
    const abiFileFullPath = this.getAbiFileFullPathLocation();
    if (!fs.existsSync(abiFileFullPath)) {
      throw new Error(`can not find abi file ${abiFileFullPath}`);
    }

    try {
      // tslint:disable-next-line: no-any
      const result: any = JSON.parse(fs.readFileSync(abiFileFullPath, 'utf8'));

      if (result.abi) {
        return result.abi;
      }

      return result as AbiItem[];
    } catch (error) {
      throw new Error(
        `Abi file ${abiFileFullPath} is not a json file. Abi must be a json file.`
      );
    }
  }

  /**
   * Get the abi file full path location with executing path
   */
  private getAbiFileFullPathLocation(): string {
    return this.buildExecutingPath(this._context.abiFileLocation);
  }

  /**
   * Build the executing path
   */
  private buildExecutingPath(joinPath: string): string {
    return TypeScriptHelpers.buildExecutingPath(joinPath);
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
          const eventInputs = abi[i].inputs;
          if (eventInputs && eventInputs.length > 0) {
            const eventInterfaceName = `${Helpers.capitalize(
              abi[i].name
            )}EventEmittedResponse`;
            let eventTypeProperties = '';
            for (let e = 0; e < eventInputs.length; e++) {
              const eventTsType = TypeScriptHelpers.getSolidityInputTsType(
                eventInputs[e],
                this._context.provider
              );

              eventTypeProperties += `${eventInputs[e].name}: ${eventTsType};`;
            }

            this.addReturnTypeInterface(
              eventInterfaceName,
              eventTypeProperties
            );
          }
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
   * @param name The abi name
   */
  private formatAbiName(name: string): string {
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
    return basename.substr(0, basename.lastIndexOf('.')); 
  }

  /**
   * Build method names type
   */
  private buildMethodNamesType(): string {
    return TypeScriptHelpers.buildType(
      `${this.getAbiName()}MethodNames`,
      this._methodNames
    );
  }

  /**
   * Build the parameters and return type interface if they accept an object of some form
   */
  private buildParametersAndReturnTypeInterfaces(): string {
    let parametersAndReturnTypes = '';

    this._parametersAndReturnTypeInterfaces.map((typeInterface) => {
      parametersAndReturnTypes += typeInterface;
    });

    return parametersAndReturnTypes;
  }

  /**
   * Build events type
   */
  private buildEventsType(): string {
    return TypeScriptHelpers.buildType(
      `${this.getAbiName()}Events`,
      this._events
    );
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
      case Provider.ethers_v5:
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
            * Payable: ${Helpers.isAcceptsEther(abiItem)}
            * Constant: ${Helpers.isNeverModifyBlockchainState(abiItem)}
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
    const parameters = this.buildParameters(abiItem);
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

        if (abiItem.inputs[i].type.includes(SolidityType.tuple)) {
          input += `${inputName}: ${this.buildTupleParametersInterface(
            abiItem.name,
            abiItem.inputs[i]
          )}`;
        } else {
          input += `${inputName}: ${TypeScriptHelpers.getSolidityInputTsType(
            abiItem.inputs[i],
            this._context.provider
          )}`;
        }
      }
    }

    // ethers allows you to pass in overrides in methods so add that in here
    if (this._context.provider.includes(Provider.ethers)) {
      input = this._ethersFactory.addOverridesToParameters(input, abiItem);
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
    const interfaceName = `${Helpers.capitalize(name)}${Helpers.capitalize(abiInput.name)}Request`;

    let properties = '';

    for (let i = 0; i < abiInput.components!.length; i++) {
      const inputTsType = TypeScriptHelpers.getSolidityInputTsType(
        abiInput.components![i],
        this._context.provider
      );

      properties += `${abiInput.components![i].name}: ${inputTsType};`;

      // check for deep tuples in tuple in tuples
      if (abiInput.components![i].components) {
        const deepInterfaceName = TypeScriptHelpers.buildInterfaceName(
          abiInput.components![i],
          'Request'
        );
        let deepProperties = '';
        for (
          let deep = 0;
          deep < abiInput.components![i].components!.length;
          deep++
        ) {
          const deepInputTsType = TypeScriptHelpers.getSolidityInputTsType(
            abiInput.components![i].components![deep],
            this._context.provider
          );
          let propertyName = abiInput.components![i].components![deep].name;
          if (propertyName.length === 0) {
            propertyName = `result${deep}`;
          }

          deepProperties += propertyName + ': ' + deepInputTsType + ';';

          if (abiInput.components![i].components![deep].components) {
            this.buildTupleParametersInterface(
              deepInterfaceName,
              abiInput.components![i].components![deep]
            );
          }
        }

        this.addReturnTypeInterface(deepInterfaceName, deepProperties);
      }
    }

    this.addReturnTypeInterface(interfaceName, properties);

    if (abiInput.type.includes('[')) {
      return `${interfaceName}[]`;
    }

    return `${interfaceName}`;
  }

  /**
   * Build the object response parameter interface
   * @param name The abi item name
   * @param abiOutput The abi output
   */
  private buildTupleResponseInterface(abiOutput: AbiOutput): string {
    const interfaceName = TypeScriptHelpers.buildInterfaceName(abiOutput);

    let properties = '';

    for (let i = 0; i < abiOutput.components!.length; i++) {
      const outputTsType = TypeScriptHelpers.getSolidityOutputTsType(
        abiOutput.components![i],
        this._context.provider
      );
      properties += `${abiOutput.components![i].name}: ${outputTsType};`;

      if (this._context.provider.includes(Provider.ethers)) {
        properties += `${i}: ${outputTsType};`;
      }

      // check for deep tuples in tuple in tuples
      if (abiOutput.components![i].components) {
        const deepInterfaceName = TypeScriptHelpers.buildInterfaceName(
          abiOutput.components![i]
        );
        let deepProperties = '';
        for (
          let deep = 0;
          deep < abiOutput.components![i].components!.length;
          deep++
        ) {
          const deepOutputTsType = TypeScriptHelpers.getSolidityOutputTsType(
            abiOutput.components![i].components![deep],
            this._context.provider
          );
          let propertyName = abiOutput.components![i].components![deep].name;
          if (propertyName.length === 0) {
            propertyName = `result${deep}`;
          }

          deepProperties += propertyName + ': ' + deepOutputTsType + ';';
          if (this._context.provider.includes(Provider.ethers)) {
            deepProperties += deep + ': ' + outputTsType + ';';
          }

          if (abiOutput.components![i].components![deep].components) {
            this.buildTupleResponseInterface(
              abiOutput.components![i].components![deep]
            );
          }
        }

        this.addReturnTypeInterface(deepInterfaceName, deepProperties);
      }
    }

    this.addReturnTypeInterface(interfaceName, properties);

    if (abiOutput.type.includes('[')) {
      return `${interfaceName}[]`;
    }

    return `${interfaceName}`;
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
          TypeScriptHelpers.getSolidityOutputTsType(
            abiItem.outputs[0],
            this._context.provider
          ),
          abiItem
        );

        if (abiItem.outputs[0].type.includes(SolidityType.tuple)) {
          this.buildTupleResponseInterface(abiItem.outputs[0]);
        }
      } else {
        if (Helpers.isNeverModifyBlockchainState(abiItem)) {
          const interfaceName = TypeScriptHelpers.buildInterfaceName(abiItem);

          let ouputProperties = '';

          for (let i = 0; i < abiItem.outputs.length; i++) {
            const abiItemOutput = abiItem.outputs[i];

            const outputTsType = TypeScriptHelpers.getSolidityOutputTsType(
              abiItemOutput,
              this._context.provider
            );

            let propertyName = abiItemOutput.name;
            if (propertyName.length === 0) {
              propertyName = `result${i}`;
            }

            ouputProperties += `${propertyName}: ${outputTsType};`;

            if (this._context.provider.includes(Provider.ethers)) {
              ouputProperties += `${i}: ${outputTsType};`;
            }

            if (abiItemOutput.type.includes(SolidityType.tuple)) {
              this.buildTupleResponseInterface(abiItem.outputs[i]);
            }
          }

          if (this._context.provider.includes(Provider.ethers)) {
            ouputProperties += `length: ${abiItem.outputs.length};`;
          }

          this.addReturnTypeInterface(interfaceName, ouputProperties);

          output += this.buildMethodReturnContext(interfaceName, abiItem);
        } else {
          // if its not a constant you will have no type so dont build any interfaces
          output += this.buildMethodReturnContext('', abiItem);
        }
      }
    } else {
      output += this.buildMethodReturnContext('void', abiItem);
    }

    return output;
  }

  /**
   * add return type interfaces
   * @param interfaceName The interface name
   * @param interfaceContext The interface context
   */
  private addReturnTypeInterface(
    interfaceName: string,
    interfaceContext: string
  ): void {
    // filter out any repeated interfaces
    if (
      !this._parametersAndReturnTypeInterfaces.find((c) =>
        c.includes(`export interface ${interfaceName}`)
      )
    ) {
      this._parametersAndReturnTypeInterfaces.push(
        TypeScriptHelpers.buildInterface(interfaceName, interfaceContext)
      );
    }
  }

  /**
   * Build the method return context
   * @param type The type it returns
   * @param abiItem The abi item
   */
  private buildMethodReturnContext(type: string, abiItem: AbiItem): string {
    switch (this._context.provider) {
      case Provider.web3:
        return this._web3Factory.buildMethodReturnContext(type, abiItem);
      case Provider.ethers:
      case Provider.ethers_v5:
        return this._ethersFactory.buildMethodReturnContext(type, abiItem);
      default:
        throw new Error(
          `${this._context.provider} is not a known supported provider`
        );
    }
  }
}

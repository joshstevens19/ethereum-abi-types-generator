import fs from 'fs-extra';
import path from 'path';
import prettierTS from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';
import Helpers from '../../common/helpers';
import AbiGenerator from './abi-generator';
import { GeneratorContext } from './contexts/generator-context';
import { Provider } from './enums/provider';
// tslint:disable-next-line: no-var-requires
const abiJson = require('./mocks/fake-contract-abi.json');

const generatorContext: GeneratorContext = {
  provider: Provider.web3,
  // tslint:disable-next-line: quotemark
  abiFileLocation: "'abi.json'",
  // tslint:disable-next-line: quotemark
  outputPathDirectory: "'here'",
};

type abiGeneratorOptionsType = {
  existsSync: boolean;
  lstatSync: boolean;
  callGenerate: boolean;
};

const abiGenertorOptions: abiGeneratorOptionsType = {
  existsSync: true,
  lstatSync: true,
  callGenerate: true,
};

let existsSyncSpy: jasmine.Spy;
let lstatSyncSpy: jasmine.Spy;
let readFileSyncSpy: jasmine.Spy;
let writeFileSyncSpy: jasmine.Spy;
let watchSpy: jasmine.Spy;

let pathDirnameSpy: jasmine.Spy;
let pathResolveSpy: jasmine.Spy;

let preitterFormatSpy: jasmine.Spy;

const callSuccessAbiGeneratorInstance = (
  options: abiGeneratorOptionsType = abiGenertorOptions,
  context: GeneratorContext = generatorContext
) => {
  const instance = new AbiGenerator(context);

  existsSyncSpy = spyOn(fs, 'existsSync').and.returnValue(options.existsSync);
  if (options.lstatSync) {
    lstatSyncSpy = spyOn(fs, 'lstatSync').and.returnValue({
      isDirectory: () => {
        return true;
      },
    });
  }
  readFileSyncSpy = spyOn(fs, 'readFileSync').and.returnValue(
    JSON.stringify(abiJson)
  );

  writeFileSyncSpy = spyOn(fs, 'writeFileSync').and.returnValue(true);
  watchSpy = spyOn(fs, 'watch').and.returnValue(true);

  pathDirnameSpy = spyOn(path, 'dirname').and.returnValue(
    generatorContext.outputPathDirectory
  );
  pathResolveSpy = spyOn(path, 'resolve').and.callThrough();

  preitterFormatSpy = spyOn(prettier, 'format').and.callThrough();

  if (options.callGenerate) {
    instance.generate();
  }
  return instance;
};

const prettierFormat = (value: string) => {
  return prettier.format(value, {
    parser: 'typescript',
    trailingComma: 'es5',
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 80,
    plugins: [prettierTS],
  });
};

describe('AbiGenerator', () => {
  it('should clear all quotes from generatorContext.abiFileLocation', () => {
    callSuccessAbiGeneratorInstance();

    expect(generatorContext.abiFileLocation).toEqual('abi.json');
  });

  it('should clear all quotes from generatorContext.outputPathDirectory', () => {
    callSuccessAbiGeneratorInstance();

    expect(generatorContext.outputPathDirectory).toEqual('here');
  });

  it('should throw an error if output path does not exist', () => {
    const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
    abiGenertorOptionsClone.existsSync = false;

    expect(() => {
      callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);
    }).toThrowError('output path must be a directory');
  });

  it('should throw an error if output path is not a dirctory', () => {
    const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
    abiGenertorOptionsClone.lstatSync = false;
    abiGenertorOptionsClone.callGenerate = false;

    spyOn(fs, 'lstatSync').and.returnValue({
      isDirectory: () => {
        return false;
      },
    });

    const instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);

    expect(() => {
      instance.generate();
    }).toThrowError('output path must be a directory');
  });

  it('should not call path.dirname if `this._context.outputPathDirectory` is defined', () => {
    callSuccessAbiGeneratorInstance();

    expect(pathDirnameSpy).toHaveBeenCalledTimes(0);
  });

  it('should call path.dirname 3 times if `this._context.outputPathDirectory` is not defined', () => {
    const generatorContextClone = Helpers.deepClone(generatorContext);
    generatorContextClone.outputPathDirectory = undefined;

    callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);

    expect(pathDirnameSpy).toHaveBeenCalledTimes(3);
  });

  it('should call path.resolve 5 time if `this._context.outputPathDirectory` is defined', () => {
    callSuccessAbiGeneratorInstance();

    expect(pathResolveSpy).toHaveBeenCalledTimes(5);
  });

  it('should call path.resolve 8 time if `this._context.outputPathDirectory` is not defined', () => {
    const generatorContextClone = Helpers.deepClone(generatorContext);
    generatorContextClone.outputPathDirectory = undefined;

    callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);

    expect(pathResolveSpy).toHaveBeenCalledTimes(8);
  });

  it('should call fs.existsSync 2 time', () => {
    callSuccessAbiGeneratorInstance();

    expect(existsSyncSpy).toHaveBeenCalledTimes(2);
  });

  it('should call fs.readFileSync 1 time', () => {
    callSuccessAbiGeneratorInstance();

    expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
  });

  it('should call fs.writeFileSyncSpy 1 time', () => {
    callSuccessAbiGeneratorInstance();

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if provider passed in is not valid', () => {
    const generatorContextClone = Helpers.deepClone(generatorContext);
    // tslint:disable-next-line: no-any
    generatorContextClone.provider = 'blah' as any;

    expect(() => {
      callSuccessAbiGeneratorInstance(
        abiGenertorOptions,
        generatorContextClone
      );
    }).toThrowError('blah is not a known supported provider');
  });

  it('should not call `fs.watch` if watch is not defined', () => {
    callSuccessAbiGeneratorInstance();

    expect(watchSpy).toHaveBeenCalledTimes(0);
  });

  it('should call `fs.watch` once if watch is set to true', () => {
    const generatorContextClone = Helpers.deepClone(generatorContext);
    generatorContextClone.watch = true;

    callSuccessAbiGeneratorInstance(abiGenertorOptions, generatorContextClone);
    expect(watchSpy).toHaveBeenCalledTimes(1);
  });

  it('should call prettier once with the default options', () => {
    callSuccessAbiGeneratorInstance();

    expect(preitterFormatSpy).toHaveBeenCalledTimes(1);
    expect(
      JSON.stringify(preitterFormatSpy.calls.mostRecent().args[1])
    ).toEqual(
      '{"parser":"typescript","trailingComma":"es5","singleQuote":true,"bracketSpacing":true,"printWidth":80,"plugins":[{"parsers":{"typescript":{"astFormat":"estree"}}}]}'
    );
  });

  describe('Web3', () => {
    it('round trip', () => {
      callSuccessAbiGeneratorInstance();

      expect(writeFileSyncSpy.calls.mostRecent().args[0]).not.toBeUndefined();
      expect(
        Helpers.removeAllWhiteSpace(writeFileSyncSpy.calls.mostRecent().args[1])
      ).toEqual(
        Helpers.removeAllWhiteSpace(
          prettierFormat(`import BN from 'bn.js';import BigNumber from'bignumber.js';
    import {
      PromiEvent,
      TransactionReceipt,
      EventResponse,
      EventData,
      Web3ContractContext,
    } from 'ethereum-abi-types-generator';
    export interface CallOptions {
      from?: string;
      gasPrice?: string;
      gas?: number;
    }
    export interface SendOptions {
      from: string;
      value?: number | string | BN |BigNumber;
      gasPrice?: string;
      gas?: number;
    }
    export interface EstimateGasOptions {
      from?: string;
      value?: number | string | BN |BigNumber;
      gas?: number;
    }
    export interface MethodPayableReturnContext {
      send(options: SendOptions): PromiEvent<TransactionReceipt>;
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
    }
    export interface MethodReturnContext extends MethodPayableReturnContext {}
    export type ContractContext = Web3ContractContext<
      Abi,
      AbiMethodNames,
      AbiEventsContext,
      AbiEvents
    >;
    export type AbiEvents = 'Event1' | 'Event2';
    export interface AbiEventsContext {
      Event1(
        parameters: {
          filter?: {
            token?: string | string[];
            exchange?: string | string[];
            _value?: string | string[];
          };
          fromBlock?: number;
          toBlock?: 'latest' | number;
          topics?: string[];
        },
        callback?: (error: Error, event: EventData) => void
      ): EventResponse;
      Event2(
        parameters: {
          filter?: { _owner?: string | string[]; _spender?: string | string[] };
          fromBlock?: number;
          toBlock?: 'latest' | number;
          topics?: string[];
        },
        callback?: (error: Error, event: EventData) => void
      ): EventResponse;
    }
    export type AbiMethodNames =
      | 'tupleInputOnly'
      | 'tupleInputAndOutput'
      | 'tupleNoInputNames'
      | 'tupleWithParametersNames'
      | 'byteArrayInputExample'
      | 'int8ReturnExample'
      | 'int256ReturnExample'
      | 'easyExample'
      | 'new';
    export interface TupleInputOnlyRequest {
      address: string;
      timestamps: [string | number, string | number, string | number];
    }
    export interface TupleInputAndOutputResponse {
      affiliate: string;
      offerID: string;
      creationTime: string;
      timestamp: string;
      timestamps: [string, string, string, string, string, string];
    }
    export interface TupleNoInputNamesResponse {
      affiliate: string;
      offerID: string;
      creationTime: string;
      timestamp: string;
      timestamps: [string, string, string, string, string, string];
    }
    export interface TupleWithParametersNamesResponse {
      affiliate: string;
      offerID: string;
      creationTime: string;
      timestamp: string;
      timestamps: [string, string, string, string, string, string];
    }
    export interface Abi {
      /**
       * Payable: false
       * Constant: false
       * StateMutability: nonpayable
       * Type: function
       * @param o Type: tuple, Indexed: false
       */
      tupleInputOnly(o: TupleInputOnlyRequest): MethodReturnContext;
      /**
       * Payable: false
       * Constant: true
       * StateMutability: view
       * Type: function
       * @param exchangeAddress Type: address, Indexed: false
       * @param internalAddress Type: address, Indexed: false
       */
      tupleInputAndOutput(
        exchangeAddress: string,
        internalAddress: string
      ): MethodConstantReturnContext<TupleInputAndOutputResponse>;
      /**
       * Payable: false
       * Constant: true
       * StateMutability: view
       * Type: function
       * @param parameter0 Type: address, Indexed: false
       * @param parameter1 Type: address, Indexed: false
       */
      tupleNoInputNames(
        parameter0: string,
        parameter1: string
      ): MethodConstantReturnContext<TupleNoInputNamesResponse>;
      /**
       * Payable: false
       * Constant: true
       * StateMutability: view
       * Type: function
       * @param address1 Type: address, Indexed: false
       * @param address2 Type: address, Indexed: false
       */
      tupleWithParametersNames(
        address1: string,
        address2: string
      ): MethodConstantReturnContext<TupleWithParametersNamesResponse>;
      /**
       * Payable: true
       * Constant: false
       * StateMutability: payable
       * Type: function
       * @param inputData Type: bytes32[2], Indexed: false
       */
      byteArrayInputExample(
        inputData: [string | number[], string | number[], string | number[]]
      ): MethodPayableReturnContext;
      /**
       * Payable: false
       * Constant: true
       * StateMutability: undefined
       * Type: function
       */
      int8ReturnExample(): MethodConstantReturnContext<string>;
      /**
       * Payable: false
       * Constant: true
       * StateMutability: undefined
       * Type: function
       */
      int256ReturnExample(): MethodConstantReturnContext<string>;
      /**
       * Payable: false
       * Constant: true
       * StateMutability: undefined
       * Type: function
       * @param valid Type: boolean, Indexed: false
       * @param exchangeAddress Type: address, Indexed: false
       * @param timestamp Type: uint8, Indexed: false
       */
      easyExample(
        valid: boolean,
        exchangeAddress: string,
        timestamp: string | number
      ): MethodConstantReturnContext<string>;
      /**
       * Payable: false
       * Constant: false
       * StateMutability: undefined
       * Type: constructor
       * @param _name Type: bytes32, Indexed: false
       * @param _symbol Type: bytes32, Indexed: false
       * @param _decimals Type: uint256, Indexed: false
       * @param _supply Type: uint256, Indexed: false
       */
      'new'(
        _name: string | number[],
        _symbol: string | number[],
        _decimals: string,
        _supply: string
      ): MethodReturnContext;
    }
    `)
        )
      );
      expect(writeFileSyncSpy.calls.mostRecent().args[2]).toEqual({
        mode: 493,
      });
    });

    it('should call _web3Factory.buildWeb3Interfaces once', () => {
      const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
      abiGenertorOptionsClone.callGenerate = false;

      const instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);

      const buildWeb3InterfacesSpy = spyOn(
        // @ts-ignore
        instance._web3Factory,
        'buildWeb3Interfaces'
      ).and.callThrough();

      const buildEthersInterfacesSpy = spyOn(
        // @ts-ignore
        instance._ethersFactory,
        'buildEthersInterfaces'
      ).and.callThrough();

      instance.generate();

      expect(buildWeb3InterfacesSpy).toHaveBeenCalledTimes(1);
      expect(buildWeb3InterfacesSpy).toHaveBeenCalledWith('Abi');

      expect(buildEthersInterfacesSpy).toHaveBeenCalledTimes(0);
    });

    it('should call _web3Factory.buildEventInterfaceProperties once', () => {
      const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
      abiGenertorOptionsClone.callGenerate = false;

      const instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);

      const web3BuildEventInterfacePropertiesSpy = spyOn(
        // @ts-ignore
        instance._web3Factory,
        'buildEventInterfaceProperties'
      ).and.callThrough();

      const ethersBuildEventInterfacePropertiesSpy = spyOn(
        // @ts-ignore
        instance._ethersFactory,
        'buildEventInterfaceProperties'
      ).and.callThrough();

      instance.generate();

      expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(1);
      expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledWith([
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'token', type: 'address' },
            { indexed: true, name: 'exchange', type: 'address' },
            { indexed: false, name: 'user', type: 'address' },
            { indexed: true, name: '_value', type: 'uint256' },
          ],
          name: 'Event1',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: '_owner', type: 'address' },
            { indexed: true, name: '_spender', type: 'address' },
            { indexed: false, name: '_value', type: 'uint256' },
          ],
          name: 'Event2',
          type: 'event',
        },
        {
          constant: false,
          inputs: [
            {
              components: [
                { name: 'address', type: 'address' },
                { name: 'timestamps', type: 'uint8[2]' },
              ],
              name: 'o',
              type: 'tuple',
            },
          ],
          name: 'tupleInputOnly',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: 'exchangeAddress', type: 'address' },
            { name: 'internalAddress', type: 'address' },
          ],
          name: 'tupleInputAndOutput',
          outputs: [
            { name: 'affiliate', type: 'address' },
            { name: 'offerID', type: 'bytes32' },
            { name: 'creationTime', type: 'uint256' },
            { name: 'timestamp', type: 'uint8' },
            { name: 'timestamps', type: 'uint8[5]' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: '', type: 'address' },
            { name: '', type: 'address' },
          ],
          name: 'tupleNoInputNames',
          outputs: [
            { name: 'affiliate', type: 'address' },
            { name: 'offerID', type: 'bytes32' },
            { name: 'creationTime', type: 'uint256' },
            { name: 'timestamp', type: 'uint8' },
            { name: 'timestamps', type: 'uint8[5]' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: 'address1', type: 'address' },
            { name: 'address2', type: 'address' },
          ],
          name: 'tupleWithParametersNames',
          outputs: [
            { name: 'affiliate', type: 'address' },
            { name: 'offerID', type: 'bytes32' },
            { name: 'creationTime', type: 'uint256' },
            { name: 'timestamp', type: 'uint8' },
            { name: 'timestamps', type: 'uint8[5]' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'inputData', type: 'bytes32[2]' }],
          name: 'byteArrayInputExample',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          gas: 783,
          inputs: [],
          name: 'int8ReturnExample',
          outputs: [{ name: 'out', type: 'uint8' }],
          payable: false,
          type: 'function',
        },
        {
          constant: true,
          gas: 783,
          inputs: [],
          name: 'int256ReturnExample',
          outputs: [{ name: 'out', type: 'uint256' }],
          payable: false,
          type: 'function',
        },
        {
          constant: true,
          gas: 783,
          inputs: [
            { name: 'valid', type: 'boolean' },
            { name: 'exchangeAddress', type: 'address' },
            { name: 'timestamp', type: 'uint8' },
          ],
          name: 'easyExample',
          outputs: [{ name: 'out', type: 'uint256' }],
          payable: false,
          type: 'function',
        },
        {
          name: '__init__',
          outputs: [],
          inputs: [
            { type: 'bytes32', name: '_name' },
            { type: 'bytes32', name: '_symbol' },
            { type: 'uint256', name: '_decimals' },
            { type: 'uint256', name: '_supply' },
          ],
          constant: false,
          payable: false,
          type: 'constructor',
        },
      ]);

      expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(0);
    });

    it('should call _web3Factory.buildMethodReturnContext 9 times', () => {
      const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
      abiGenertorOptionsClone.callGenerate = false;

      const instance = callSuccessAbiGeneratorInstance(abiGenertorOptionsClone);

      const web3BuildMethodReturnContextSpy = spyOn(
        // @ts-ignore
        instance._web3Factory,
        'buildMethodReturnContext'
      ).and.callThrough();

      const ethersBuildMethodReturnContextSpy = spyOn(
        // @ts-ignore
        instance._ethersFactory,
        'buildMethodReturnContext'
      ).and.callThrough();

      instance.generate();

      expect(web3BuildMethodReturnContextSpy).toHaveBeenCalledTimes(9);
      expect(ethersBuildMethodReturnContextSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Ethers', () => {
    it('round trip', () => {
      const generatorContextClone = Helpers.deepClone(generatorContext);
      generatorContextClone.provider = Provider.ethers;

      callSuccessAbiGeneratorInstance(
        abiGenertorOptions,
        generatorContextClone
      );

      expect(writeFileSyncSpy.calls.mostRecent().args[0]).not.toBeUndefined();
      expect(
        Helpers.removeAllWhiteSpace(writeFileSyncSpy.calls.mostRecent().args[1])
      ).toEqual(
        Helpers.removeAllWhiteSpace(
          prettierFormat(`import { ContractTransaction } from 'ethers';
            import { Arrayish, BigNumber, BigNumberish, Interface } from 'ethers/utils';
            import { EthersContractContext } from 'ethereum-abi-types-generator';
            export type ContractContext = EthersContractContext<
              Abi,
              AbiEventsContext,
              AbiEvents
            >;
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
            export type AbiEvents = 'Event1' | 'Event2';
            export interface AbiEventsContext {
              Event1(...parameters: any): EventFilter;
              Event2(...parameters: any): EventFilter;
            }
            export type AbiMethodNames =
              | 'tupleInputOnly'
              | 'tupleInputAndOutput'
              | 'tupleNoInputNames'
              | 'tupleWithParametersNames'
              | 'byteArrayInputExample'
              | 'int8ReturnExample'
              | 'int256ReturnExample'
              | 'easyExample'
              | 'new';
            export interface TupleInputOnlyRequest {
              address: string;
              timestamps: [BigNumberish, BigNumberish, BigNumberish];
            }
            export interface TupleInputAndOutputResponse {
              affiliate: string;
              0: string;
              offerID: string;
              1: string;
              creationTime: BigNumber;
              2: BigNumber;
              timestamp: number;
              3: number;
              timestamps: [number, number, number, number, number, number];
              4: [number, number, number, number, number, number];
              length: 5;
            }
            export interface TupleNoInputNamesResponse {
              affiliate: string;
              0: string;
              offerID: string;
              1: string;
              creationTime: BigNumber;
              2: BigNumber;
              timestamp: number;
              3: number;
              timestamps: [number, number, number, number, number, number];
              4: [number, number, number, number, number, number];
              length: 5;
            }
            export interface TupleWithParametersNamesResponse {
              affiliate: string;
              0: string;
              offerID: string;
              1: string;
              creationTime: BigNumber;
              2: BigNumber;
              timestamp: number;
              3: number;
              timestamps: [number, number, number, number, number, number];
              4: [number, number, number, number, number, number];
              length: 5;
            }
            export interface Abi {
              /**
               * Payable: false
               * Constant: false
               * StateMutability: nonpayable
               * Type: function
               * @param o Type: tuple, Indexed: false
               */
              tupleInputOnly(
                o: TupleInputOnlyRequest,
                overrides?: ContractTransactionOverrides
              ): Promise<ContractTransaction>;
              /**
               * Payable: false
               * Constant: true
               * StateMutability: view
               * Type: function
               * @param exchangeAddress Type: address, Indexed: false
               * @param internalAddress Type: address, Indexed: false
               */
              tupleInputAndOutput(
                exchangeAddress: string,
                internalAddress: string,
                overrides?: ContractCallOverrides
              ): Promise<TupleInputAndOutputResponse>;
              /**
               * Payable: false
               * Constant: true
               * StateMutability: view
               * Type: function
               * @param parameter0 Type: address, Indexed: false
               * @param parameter1 Type: address, Indexed: false
               */
              tupleNoInputNames(
                parameter0: string,
                parameter1: string,
                overrides?: ContractCallOverrides
              ): Promise<TupleNoInputNamesResponse>;
              /**
               * Payable: false
               * Constant: true
               * StateMutability: view
               * Type: function
               * @param address1 Type: address, Indexed: false
               * @param address2 Type: address, Indexed: false
               */
              tupleWithParametersNames(
                address1: string,
                address2: string,
                overrides?: ContractCallOverrides
              ): Promise<TupleWithParametersNamesResponse>;
              /**
               * Payable: true
               * Constant: false
               * StateMutability: payable
               * Type: function
               * @param inputData Type: bytes32[2], Indexed: false
               */
              byteArrayInputExample(
                inputData: [Arrayish, Arrayish, Arrayish],
                overrides?: ContractTransactionOverrides
              ): Promise<ContractTransaction>;
              /**
               * Payable: false
               * Constant: true
               * StateMutability: undefined
               * Type: function
               */
              int8ReturnExample(overrides?: ContractCallOverrides): Promise<number>;
              /**
               * Payable: false
               * Constant: true
               * StateMutability: undefined
               * Type: function
               */
              int256ReturnExample(overrides?: ContractCallOverrides): Promise<BigNumber>;
              /**
               * Payable: false
               * Constant: true
               * StateMutability: undefined
               * Type: function
               * @param valid Type: boolean, Indexed: false
               * @param exchangeAddress Type: address, Indexed: false
               * @param timestamp Type: uint8, Indexed: false
               */
              easyExample(
                valid: boolean,
                exchangeAddress: string,
                timestamp: BigNumberish,
                overrides?: ContractCallOverrides
              ): Promise<BigNumber>;
              /**
               * Payable: false
               * Constant: false
               * StateMutability: undefined
               * Type: constructor
               * @param _name Type: bytes32, Indexed: false
               * @param _symbol Type: bytes32, Indexed: false
               * @param _decimals Type: uint256, Indexed: false
               * @param _supply Type: uint256, Indexed: false
               */
              'new'(
                _name: Arrayish,
                _symbol: Arrayish,
                _decimals: BigNumberish,
                _supply: BigNumberish,
                overrides?: ContractTransactionOverrides
              ): Promise<ContractTransaction>;
            }
    `)
        )
      );
      expect(writeFileSyncSpy.calls.mostRecent().args[2]).toEqual({
        mode: 493,
      });
    });

    it('should call _ethersFactory.buildEthersInterfaces once', () => {
      const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
      abiGenertorOptionsClone.callGenerate = false;

      const generatorContextClone = Helpers.deepClone(generatorContext);
      generatorContextClone.provider = Provider.ethers;

      const instance = callSuccessAbiGeneratorInstance(
        abiGenertorOptionsClone,
        generatorContextClone
      );

      const buildEthersInterfacesSpy = spyOn(
        // @ts-ignore
        instance._ethersFactory,
        'buildEthersInterfaces'
      ).and.callThrough();

      const buildWeb3InterfacesSpy = spyOn(
        // @ts-ignore
        instance._web3Factory,
        'buildWeb3Interfaces'
      ).and.callThrough();

      instance.generate();

      expect(buildEthersInterfacesSpy).toHaveBeenCalledTimes(1);
      expect(buildEthersInterfacesSpy).toHaveBeenCalledWith('Abi');

      expect(buildWeb3InterfacesSpy).toHaveBeenCalledTimes(0);
    });

    it('should call _ethersFactory.buildEventInterfaceProperties once', () => {
      const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
      abiGenertorOptionsClone.callGenerate = false;

      const generatorContextClone = Helpers.deepClone(generatorContext);
      generatorContextClone.provider = Provider.ethers;

      const instance = callSuccessAbiGeneratorInstance(
        abiGenertorOptionsClone,
        generatorContextClone
      );

      const ethersBuildEventInterfacePropertiesSpy = spyOn(
        // @ts-ignore
        instance._ethersFactory,
        'buildEventInterfaceProperties'
      ).and.callThrough();

      const web3BuildEventInterfacePropertiesSpy = spyOn(
        // @ts-ignore
        instance._web3Factory,
        'buildEventInterfaceProperties'
      ).and.callThrough();

      instance.generate();

      expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(1);
      expect(ethersBuildEventInterfacePropertiesSpy).toHaveBeenCalledWith([
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'token', type: 'address' },
            { indexed: true, name: 'exchange', type: 'address' },
            { indexed: false, name: 'user', type: 'address' },
            { indexed: true, name: '_value', type: 'uint256' },
          ],
          name: 'Event1',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: '_owner', type: 'address' },
            { indexed: true, name: '_spender', type: 'address' },
            { indexed: false, name: '_value', type: 'uint256' },
          ],
          name: 'Event2',
          type: 'event',
        },
        {
          constant: false,
          inputs: [
            {
              components: [
                { name: 'address', type: 'address' },
                { name: 'timestamps', type: 'uint8[2]' },
              ],
              name: 'o',
              type: 'tuple',
            },
          ],
          name: 'tupleInputOnly',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: 'exchangeAddress', type: 'address' },
            { name: 'internalAddress', type: 'address' },
          ],
          name: 'tupleInputAndOutput',
          outputs: [
            { name: 'affiliate', type: 'address' },
            { name: 'offerID', type: 'bytes32' },
            { name: 'creationTime', type: 'uint256' },
            { name: 'timestamp', type: 'uint8' },
            { name: 'timestamps', type: 'uint8[5]' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: '', type: 'address' },
            { name: '', type: 'address' },
          ],
          name: 'tupleNoInputNames',
          outputs: [
            { name: 'affiliate', type: 'address' },
            { name: 'offerID', type: 'bytes32' },
            { name: 'creationTime', type: 'uint256' },
            { name: 'timestamp', type: 'uint8' },
            { name: 'timestamps', type: 'uint8[5]' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: 'address1', type: 'address' },
            { name: 'address2', type: 'address' },
          ],
          name: 'tupleWithParametersNames',
          outputs: [
            { name: 'affiliate', type: 'address' },
            { name: 'offerID', type: 'bytes32' },
            { name: 'creationTime', type: 'uint256' },
            { name: 'timestamp', type: 'uint8' },
            { name: 'timestamps', type: 'uint8[5]' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'inputData', type: 'bytes32[2]' }],
          name: 'byteArrayInputExample',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          gas: 783,
          inputs: [],
          name: 'int8ReturnExample',
          outputs: [{ name: 'out', type: 'uint8' }],
          payable: false,
          type: 'function',
        },
        {
          constant: true,
          gas: 783,
          inputs: [],
          name: 'int256ReturnExample',
          outputs: [{ name: 'out', type: 'uint256' }],
          payable: false,
          type: 'function',
        },
        {
          constant: true,
          gas: 783,
          inputs: [
            { name: 'valid', type: 'boolean' },
            { name: 'exchangeAddress', type: 'address' },
            { name: 'timestamp', type: 'uint8' },
          ],
          name: 'easyExample',
          outputs: [{ name: 'out', type: 'uint256' }],
          payable: false,
          type: 'function',
        },
        {
          name: '__init__',
          outputs: [],
          inputs: [
            { type: 'bytes32', name: '_name' },
            { type: 'bytes32', name: '_symbol' },
            { type: 'uint256', name: '_decimals' },
            { type: 'uint256', name: '_supply' },
          ],
          constant: false,
          payable: false,
          type: 'constructor',
        },
      ]);

      expect(web3BuildEventInterfacePropertiesSpy).toHaveBeenCalledTimes(0);
    });

    it('should call _ethersFactory.buildMethodReturnContext 9 times', () => {
      const abiGenertorOptionsClone = Helpers.deepClone(abiGenertorOptions);
      abiGenertorOptionsClone.callGenerate = false;

      const generatorContextClone = Helpers.deepClone(generatorContext);
      generatorContextClone.provider = Provider.ethers;

      const instance = callSuccessAbiGeneratorInstance(
        abiGenertorOptionsClone,
        generatorContextClone
      );

      const ethersBuildMethodReturnContextSpy = spyOn(
        // @ts-ignore
        instance._ethersFactory,
        'buildMethodReturnContext'
      ).and.callThrough();

      const web3BuildMethodReturnContextSpy = spyOn(
        // @ts-ignore
        instance._web3Factory,
        'buildMethodReturnContext'
      ).and.callThrough();

      instance.generate();

      expect(ethersBuildMethodReturnContextSpy).toHaveBeenCalledTimes(9);
      expect(web3BuildMethodReturnContextSpy).toHaveBeenCalledTimes(0);
    });
  });
});

import BN from 'bn.js';
import BigNumber from 'bignumber.js';
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
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  FakeContract,
  FakeContractMethodNames,
  FakeContractEventsContext,
  FakeContractEvents
>;
export type FakeContractEvents = 'Event1' | 'Event2';
export interface FakeContractEventsContext {
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
export type FakeContractMethodNames =
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
export interface FakeContract {
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param o Type: tuple, Indexed: false
   */
  tupleInputOnly(o: TupleInputOnlyRequest): MethodPayableReturnContext;
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

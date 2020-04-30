import { EthersContractContext } from 'ethereum-abi-types-generator';
import { ContractTransaction } from 'ethers';
import { Arrayish, BigNumber, BigNumberish } from 'ethers/utils';

export type ContractContext = EthersContractContext<
  FakeContract,
  FakeContractEventsContext,
  FakeContractEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};
export type FakeContractEvents = 'Event1' | 'Event2';
export interface FakeContractEventsContext {
  Event1(...parameters: any): EventFilter;
  Event2(...parameters: any): EventFilter;
}
export type FakeContractMethodNames =
  | 'tupleInputOnly'
  | 'tupleInputAndOutput'
  | 'tupleNoInputNames'
  | 'tupleWithParametersNames'
  | 'byteArrayInputExample'
  | 'int8ReturnExample'
  | 'int256ReturnExample'
  | 'easyExample';
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
export interface FakeContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param o Type: tuple, Indexed: false
   */
  tupleInputOnly(o: TupleInputOnlyRequest): Promise<ContractTransaction>;
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
    parameter1: string
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
    address2: string
  ): Promise<TupleWithParametersNamesResponse>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param inputData Type: bytes32[2], Indexed: false
   */
  byteArrayInputExample(
    inputData: [Arrayish, Arrayish, Arrayish]
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  int8ReturnExample(): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  int256ReturnExample(): Promise<BigNumber>;
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
    timestamp: BigNumberish
  ): Promise<BigNumber>;
}

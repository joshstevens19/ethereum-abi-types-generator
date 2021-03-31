import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethersv5';

export type ContractContext = EthersContractContextV5<
  UniswapFactoryContract,
  UniswapFactoryContractMethodNames,
  UniswapFactoryContractEventsContext,
  UniswapFactoryContractEvents
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
export type UniswapFactoryContractEvents = 'NewExchange';
export interface UniswapFactoryContractEventsContext {
  NewExchange(...parameters: any): EventFilter;
}
export type UniswapFactoryContractMethodNames =
  | 'initializeFactory'
  | 'createExchange'
  | 'getExchange'
  | 'getToken'
  | 'getTokenWithId'
  | 'exchangeTemplate'
  | 'tokenCount';
export interface UniswapFactoryContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param template Type: address, Indexed: false
   */
  initializeFactory(
    template: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param token Type: address, Indexed: false
   */
  createExchange(
    token: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param token Type: address, Indexed: false
   */
  getExchange(
    token: string,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param exchange Type: address, Indexed: false
   */
  getToken(
    exchange: string,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param token_id Type: uint256, Indexed: false
   */
  getTokenWithId(
    token_id: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  exchangeTemplate(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  tokenCount(overrides?: ContractCallOverrides): Promise<BigNumber>;
}

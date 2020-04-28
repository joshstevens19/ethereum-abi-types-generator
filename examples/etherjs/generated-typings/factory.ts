import { ContractTransaction } from 'ethers';
export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};
export enum UniswapFactoryAbiEvents {
  NewExchange = 'NewExchange',
}
export interface UniswapFactoryAbiEventsContext {
  NewExchange(...parameters: any): EventFilter;
}
export enum UniswapFactoryAbiMethodNames {
  initializeFactory = 'initializeFactory',
  createExchange = 'createExchange',
  getExchange = 'getExchange',
  getToken = 'getToken',
  getTokenWithId = 'getTokenWithId',
  exchangeTemplate = 'exchangeTemplate',
  tokenCount = 'tokenCount',
}
export interface UniswapFactoryAbi {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param template Type: address, Indexed: false
   */
  initializeFactory(template: string): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param token Type: address, Indexed: false
   */
  createExchange(token: string): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param token Type: address, Indexed: false
   */
  getExchange(token: string): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param exchange Type: address, Indexed: false
   */
  getToken(exchange: string): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param token_id Type: uint256, Indexed: false
   */
  getTokenWithId(token_id: string): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  exchangeTemplate(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  tokenCount(): Promise<string>;
}

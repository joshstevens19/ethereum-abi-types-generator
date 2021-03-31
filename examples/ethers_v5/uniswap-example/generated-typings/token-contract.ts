import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import {
  BigNumber,
  BigNumberish,
  BytesLike as Arrayish,
  ContractTransaction,
} from 'ethersv5';

export type ContractContext = EthersContractContextV5<
  TokenContract,
  TokenContractMethodNames,
  TokenContractEventsContext,
  TokenContractEvents
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
export type TokenContractEvents = 'Transfer' | 'Approval';
export interface TokenContractEventsContext {
  Transfer(...parameters: any): EventFilter;
  Approval(...parameters: any): EventFilter;
}
export type TokenContractMethodNames =
  | 'new'
  | 'deposit'
  | 'withdraw'
  | 'totalSupply'
  | 'balanceOf'
  | 'transfer'
  | 'transferFrom'
  | 'approve'
  | 'allowance'
  | 'name'
  | 'symbol'
  | 'decimals';
export interface TokenContract {
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
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   */
  deposit(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _value Type: uint256, Indexed: false
   */
  withdraw(
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(
    _owner: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  transferFrom(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _spender Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  approve(
    _spender: string,
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _spender Type: address, Indexed: false
   */
  allowance(
    _owner: string,
    _spender: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  decimals(overrides?: ContractCallOverrides): Promise<BigNumber>;
}

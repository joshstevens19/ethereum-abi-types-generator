import { ContractTransaction } from 'ethers';
import { Arrayish, BigNumber, BigNumberish, Interface } from 'ethers/utils';
import { EthersContractContext } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContext<
  UniswapExchangeContract,
  UniswapExchangeContractEventsContext,
  UniswapExchangeContractEvents
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
export type UniswapExchangeContractEvents =
  | 'TokenPurchase'
  | 'EthPurchase'
  | 'AddLiquidity'
  | 'RemoveLiquidity'
  | 'Transfer'
  | 'Approval';
export interface UniswapExchangeContractEventsContext {
  TokenPurchase(...parameters: any): EventFilter;
  EthPurchase(...parameters: any): EventFilter;
  AddLiquidity(...parameters: any): EventFilter;
  RemoveLiquidity(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
  Approval(...parameters: any): EventFilter;
}
export type UniswapExchangeContractMethodNames =
  | 'setup'
  | 'addLiquidity'
  | 'removeLiquidity'
  | '__default__'
  | 'ethToTokenSwapInput'
  | 'ethToTokenTransferInput'
  | 'ethToTokenSwapOutput'
  | 'ethToTokenTransferOutput'
  | 'tokenToEthSwapInput'
  | 'tokenToEthTransferInput'
  | 'tokenToEthSwapOutput'
  | 'tokenToEthTransferOutput'
  | 'tokenToTokenSwapInput'
  | 'tokenToTokenTransferInput'
  | 'tokenToTokenSwapOutput'
  | 'tokenToTokenTransferOutput'
  | 'tokenToExchangeSwapInput'
  | 'tokenToExchangeTransferInput'
  | 'tokenToExchangeSwapOutput'
  | 'tokenToExchangeTransferOutput'
  | 'getEthToTokenInputPrice'
  | 'getEthToTokenOutputPrice'
  | 'getTokenToEthInputPrice'
  | 'getTokenToEthOutputPrice'
  | 'tokenAddress'
  | 'factoryAddress'
  | 'balanceOf'
  | 'transfer'
  | 'transferFrom'
  | 'approve'
  | 'allowance'
  | 'name'
  | 'symbol'
  | 'decimals'
  | 'totalSupply';
export interface UniswapExchangeContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param token_addr Type: address, Indexed: false
   */
  setup(
    token_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param min_liquidity Type: uint256, Indexed: false
   * @param max_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  addLiquidity(
    min_liquidity: BigNumberish,
    max_tokens: BigNumberish,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param amount Type: uint256, Indexed: false
   * @param min_eth Type: uint256, Indexed: false
   * @param min_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  removeLiquidity(
    amount: BigNumberish,
    min_eth: BigNumberish,
    min_tokens: BigNumberish,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   */
  __default__(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param min_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  ethToTokenSwapInput(
    min_tokens: BigNumberish,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param min_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  ethToTokenTransferInput(
    min_tokens: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  ethToTokenSwapOutput(
    tokens_bought: BigNumberish,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  ethToTokenTransferOutput(
    tokens_bought: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   * @param min_eth Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  tokenToEthSwapInput(
    tokens_sold: BigNumberish,
    min_eth: BigNumberish,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   * @param min_eth Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  tokenToEthTransferInput(
    tokens_sold: BigNumberish,
    min_eth: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param eth_bought Type: uint256, Indexed: false
   * @param max_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  tokenToEthSwapOutput(
    eth_bought: BigNumberish,
    max_tokens: BigNumberish,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param eth_bought Type: uint256, Indexed: false
   * @param max_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  tokenToEthTransferOutput(
    eth_bought: BigNumberish,
    max_tokens: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   * @param min_tokens_bought Type: uint256, Indexed: false
   * @param min_eth_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param token_addr Type: address, Indexed: false
   */
  tokenToTokenSwapInput(
    tokens_sold: BigNumberish,
    min_tokens_bought: BigNumberish,
    min_eth_bought: BigNumberish,
    deadline: BigNumberish,
    token_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   * @param min_tokens_bought Type: uint256, Indexed: false
   * @param min_eth_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param token_addr Type: address, Indexed: false
   */
  tokenToTokenTransferInput(
    tokens_sold: BigNumberish,
    min_tokens_bought: BigNumberish,
    min_eth_bought: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    token_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param max_tokens_sold Type: uint256, Indexed: false
   * @param max_eth_sold Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param token_addr Type: address, Indexed: false
   */
  tokenToTokenSwapOutput(
    tokens_bought: BigNumberish,
    max_tokens_sold: BigNumberish,
    max_eth_sold: BigNumberish,
    deadline: BigNumberish,
    token_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param max_tokens_sold Type: uint256, Indexed: false
   * @param max_eth_sold Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param token_addr Type: address, Indexed: false
   */
  tokenToTokenTransferOutput(
    tokens_bought: BigNumberish,
    max_tokens_sold: BigNumberish,
    max_eth_sold: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    token_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   * @param min_tokens_bought Type: uint256, Indexed: false
   * @param min_eth_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param exchange_addr Type: address, Indexed: false
   */
  tokenToExchangeSwapInput(
    tokens_sold: BigNumberish,
    min_tokens_bought: BigNumberish,
    min_eth_bought: BigNumberish,
    deadline: BigNumberish,
    exchange_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   * @param min_tokens_bought Type: uint256, Indexed: false
   * @param min_eth_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param exchange_addr Type: address, Indexed: false
   */
  tokenToExchangeTransferInput(
    tokens_sold: BigNumberish,
    min_tokens_bought: BigNumberish,
    min_eth_bought: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    exchange_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param max_tokens_sold Type: uint256, Indexed: false
   * @param max_eth_sold Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param exchange_addr Type: address, Indexed: false
   */
  tokenToExchangeSwapOutput(
    tokens_bought: BigNumberish,
    max_tokens_sold: BigNumberish,
    max_eth_sold: BigNumberish,
    deadline: BigNumberish,
    exchange_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param max_tokens_sold Type: uint256, Indexed: false
   * @param max_eth_sold Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param exchange_addr Type: address, Indexed: false
   */
  tokenToExchangeTransferOutput(
    tokens_bought: BigNumberish,
    max_tokens_sold: BigNumberish,
    max_eth_sold: BigNumberish,
    deadline: BigNumberish,
    recipient: string,
    exchange_addr: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param eth_sold Type: uint256, Indexed: false
   */
  getEthToTokenInputPrice(
    eth_sold: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   */
  getEthToTokenOutputPrice(
    tokens_bought: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   */
  getTokenToEthInputPrice(
    tokens_sold: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param eth_bought Type: uint256, Indexed: false
   */
  getTokenToEthOutputPrice(
    eth_bought: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  tokenAddress(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  factoryAddress(overrides?: ContractCallOverrides): Promise<string>;
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
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
}

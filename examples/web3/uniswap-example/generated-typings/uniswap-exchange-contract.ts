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
  UniswapExchangeContract,
  UniswapExchangeContractMethodNames,
  UniswapExchangeContractEventsContext,
  UniswapExchangeContractEvents
>;
export type UniswapExchangeContractEvents =
  | 'TokenPurchase'
  | 'EthPurchase'
  | 'AddLiquidity'
  | 'RemoveLiquidity'
  | 'Transfer'
  | 'Approval';
export interface UniswapExchangeContractEventsContext {
  TokenPurchase(
    parameters: {
      filter?: {
        buyer?: string | string[];
        eth_sold?: string | string[];
        tokens_bought?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  EthPurchase(
    parameters: {
      filter?: {
        buyer?: string | string[];
        tokens_sold?: string | string[];
        eth_bought?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  AddLiquidity(
    parameters: {
      filter?: {
        provider?: string | string[];
        eth_amount?: string | string[];
        token_amount?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  RemoveLiquidity(
    parameters: {
      filter?: {
        provider?: string | string[];
        eth_amount?: string | string[];
        token_amount?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Transfer(
    parameters: {
      filter?: { _from?: string | string[]; _to?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Approval(
    parameters: {
      filter?: { _owner?: string | string[]; _spender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
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
  setup(token_addr: string): MethodReturnContext;
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
    min_liquidity: string,
    max_tokens: string,
    deadline: string
  ): MethodPayableReturnContext;
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
    amount: string,
    min_eth: string,
    min_tokens: string,
    deadline: string
  ): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   */
  __default__(): MethodPayableReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param min_tokens Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  ethToTokenSwapInput(
    min_tokens: string,
    deadline: string
  ): MethodPayableReturnContext;
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
    min_tokens: string,
    deadline: string,
    recipient: string
  ): MethodPayableReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  ethToTokenSwapOutput(
    tokens_bought: string,
    deadline: string
  ): MethodPayableReturnContext;
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
    tokens_bought: string,
    deadline: string,
    recipient: string
  ): MethodPayableReturnContext;
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
    tokens_sold: string,
    min_eth: string,
    deadline: string
  ): MethodReturnContext;
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
    tokens_sold: string,
    min_eth: string,
    deadline: string,
    recipient: string
  ): MethodReturnContext;
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
    eth_bought: string,
    max_tokens: string,
    deadline: string
  ): MethodReturnContext;
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
    eth_bought: string,
    max_tokens: string,
    deadline: string,
    recipient: string
  ): MethodReturnContext;
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
    tokens_sold: string,
    min_tokens_bought: string,
    min_eth_bought: string,
    deadline: string,
    token_addr: string
  ): MethodReturnContext;
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
    tokens_sold: string,
    min_tokens_bought: string,
    min_eth_bought: string,
    deadline: string,
    recipient: string,
    token_addr: string
  ): MethodReturnContext;
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
    tokens_bought: string,
    max_tokens_sold: string,
    max_eth_sold: string,
    deadline: string,
    token_addr: string
  ): MethodReturnContext;
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
    tokens_bought: string,
    max_tokens_sold: string,
    max_eth_sold: string,
    deadline: string,
    recipient: string,
    token_addr: string
  ): MethodReturnContext;
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
    tokens_sold: string,
    min_tokens_bought: string,
    min_eth_bought: string,
    deadline: string,
    exchange_addr: string
  ): MethodReturnContext;
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
    tokens_sold: string,
    min_tokens_bought: string,
    min_eth_bought: string,
    deadline: string,
    recipient: string,
    exchange_addr: string
  ): MethodReturnContext;
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
    tokens_bought: string,
    max_tokens_sold: string,
    max_eth_sold: string,
    deadline: string,
    exchange_addr: string
  ): MethodReturnContext;
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
    tokens_bought: string,
    max_tokens_sold: string,
    max_eth_sold: string,
    deadline: string,
    recipient: string,
    exchange_addr: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param eth_sold Type: uint256, Indexed: false
   */
  getEthToTokenInputPrice(
    eth_sold: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param tokens_bought Type: uint256, Indexed: false
   */
  getEthToTokenOutputPrice(
    tokens_bought: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param tokens_sold Type: uint256, Indexed: false
   */
  getTokenToEthInputPrice(
    tokens_sold: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param eth_bought Type: uint256, Indexed: false
   */
  getTokenToEthOutputPrice(
    eth_bought: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  tokenAddress(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  factoryAddress(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(_owner: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  transfer(_to: string, _value: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  transferFrom(_from: string, _to: string, _value: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _spender Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  approve(_spender: string, _value: string): MethodReturnContext;
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
    _spender: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  decimals(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  totalSupply(): MethodConstantReturnContext<string>;
}

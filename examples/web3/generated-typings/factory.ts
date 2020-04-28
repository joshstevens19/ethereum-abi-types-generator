export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value: number | string; // | BN;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string; // | BN;
  gas?: number;
}
export interface MethodPayableReturnContext {
  send(options: SendOptions): Promise<any>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): Promise<any>;
  estimateGas(options: EstimateGasOptions): Promise<any>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<any>;
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
export enum UniswapFactoryAbiEvents {
  NewExchange = 'NewExchange',
}
export interface UniswapFactoryAbiEventsContext {
  NewExchange(parameters: {
    filter?: { token?: string | string[]; exchange?: string | string[] };
    fromBlock?: number;
    toBlock?: 'latest' | number;
    topics?: string[];
  }): any;
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
  initializeFactory(template: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param token Type: address, Indexed: false
   */
  createExchange(token: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param token Type: address, Indexed: false
   */
  getExchange(token: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param exchange Type: address, Indexed: false
   */
  getToken(exchange: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   * @param token_id Type: uint256, Indexed: false
   */
  getTokenWithId(token_id: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  exchangeTemplate(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  tokenCount(): MethodConstantReturnContext<string>;
}

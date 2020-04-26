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

export enum AbiEvents {
  Transfer = 'Transfer',
  Approval = 'Approval',
}
export interface EventsContext {
  Transfer(parameters: {
    filter?: { _from: string | string[]; _to: string | string[] };
    fromBlock?: number;
    toBlock?: 'latest' | number;
    topics?: string[];
  }): any;
  Approval(parameters: {
    filter?: { _owner: string | string[]; _spender: string | string[] };
    fromBlock?: number;
    toBlock?: 'latest' | number;
    topics?: string[];
  }): any;
}
export enum FactoryAbiMethodNames {
  new = 'new',
  deposit = 'deposit',
  withdraw = 'withdraw',
  totalSupply = 'totalSupply',
  balanceOf = 'balanceOf',
  transfer = 'transfer',
  transferFrom = 'transferFrom',
  approve = 'approve',
  allowance = 'allowance',
  name = 'name',
  symbol = 'symbol',
  decimals = 'decimals',
}
export interface FactoryAbi {
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
    _name: string,
    _symbol: string,
    _decimals: string,
    _supply: string
  ): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: undefined
   * Type: function
   */
  deposit(): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: undefined
   * Type: function
   * @param _value Type: uint256, Indexed: false
   */
  withdraw(_value: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: undefined
   * Type: function
   */
  totalSupply(): MethodConstantReturnContext<string>;
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
}

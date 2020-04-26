import { AbiInput, AbiOutput } from '../abi-properties/abi-item';

export interface Web3ContractContext<
  TMethodsInterface,
  TMethodNamesEnum,
  TEventsInterface,
  TEventEnum
> {
  address: string;
  jsonInterface: AbiModel<TMethodNamesEnum, TEventEnum>;

  options: Options;

  clone(): Web3ContractContext<
    TMethodsInterface,
    TMethodNamesEnum,
    TEventsInterface,
    TEventEnum
  >;

  deploy(options: DeployOptions): ContractSendMethod;

  methods: TMethodsInterface;

  once(
    event: TEventEnum,
    callback: (error: Error, event: EventData) => void
  ): void;
  once(
    event: TEventEnum,
    options: EventOptions,
    callback: (error: Error, event: EventData) => void
  ): void;

  events: TEventsInterface;

  getPastEvents(event: TEventEnum): Promise<EventData[]>;
  getPastEvents(
    event: TEventEnum,
    options: EventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: TEventEnum, options: EventOptions): Promise<EventData[]>;
  getPastEvents(
    event: TEventEnum,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}

export interface AbiModel<TMethodNamesEnum, TEventEnum> {
  getMethod(name: TMethodNamesEnum): AbiItemModel<TMethodNamesEnum> | false;

  getMethods(): AbiItemModel<TMethodNamesEnum>[];

  hasMethod(name: TMethodNamesEnum): boolean;

  getEvent(name: TEventEnum): AbiItemModel<TMethodNamesEnum> | false;

  getEvents(): AbiItemModel<TMethodNamesEnum>[];

  getEventBySignature(signature: string): AbiItemModel<TMethodNamesEnum>;

  hasEvent(name: TEventEnum): boolean;
}

export interface AbiItemModel<TMethodNamesEnum> {
  signature: string;
  name: TMethodNamesEnum;
  payable: boolean;
  anonymous: boolean;

  getInputLength(): number;

  getInputs(): AbiInput[];

  getIndexedInputs(): AbiInput[];

  getOutputs(): AbiOutput[];

  isOfType(): boolean;
}

export interface Options {
  address: string;
  data: string;
}

export interface DeployOptions {
  data: string;
  arguments?: any[];
}

export interface ContractSendMethod {
  send(
    options: SendOptions,
    callback?: (err: Error, transactionHash: string) => void
  ): PromiEvent<Web3ContractContext<any, any, any, any>>;

  estimateGas(
    options: EstimateGasOptions,
    callback?: (err: Error, gas: number) => void
  ): Promise<number>;

  estimateGas(callback: (err: Error, gas: number) => void): Promise<number>;

  estimateGas(
    options: EstimateGasOptions,
    callback: (err: Error, gas: number) => void
  ): Promise<number>;

  estimateGas(options: EstimateGasOptions): Promise<number>;

  estimateGas(): Promise<number>;

  encodeABI(): string;
}

export interface SendOptions {
  from: string;
  gasPrice?: string;
  gas?: number;
  value?: number | string; // | BN;
}

export interface EstimateGasOptions {
  from?: string;
  gas?: number;
  value?: number | string; // | BN;
}

export interface PromiEvent<T> extends Promise<T> {
  once(
    type: 'transactionHash',
    handler: (receipt: string) => void
  ): PromiEvent<T>;

  once(
    type: 'receipt',
    handler: (receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  once(
    type: 'confirmation',
    handler: (confNumber: number, receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  once(type: 'error', handler: (error: Error) => void): PromiEvent<T>;

  on(
    type: 'transactionHash',
    handler: (receipt: string) => void
  ): PromiEvent<T>;

  on(
    type: 'receipt',
    handler: (receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  on(
    type: 'confirmation',
    handler: (confNumber: number, receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  on(type: 'error', handler: (error: Error) => void): PromiEvent<T>;
}

export interface TransactionReceipt {
  status: boolean;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  contractAddress?: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  logs: Log[];
  logsBloom: string;
  events?: {
    [eventName: string]: EventLog;
  };
}

export interface Log {
  address: string;
  data: string;
  topics: Array<string | string[]>;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
}

export interface EventLog {
  event: string;
  address: string;
  returnValues: any;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  raw?: { data: string; topics: any[] };
}

export interface EventData {
  returnValues: {
    [key: string]: any;
  };
  raw: {
    data: string;
    topics: string[];
  };
  event: string;
  signature: string;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: string;
}

export interface EventOptions {
  filter?: any;
  fromBlock?: number;
  toBlock?: 'latest' | number;
  topics?: any[];
}

export interface EventResponse<T> {
  once(type: 'data', handler: (event: EventData) => void): EventResponse<T>;
  once(type: 'changed', handler: (event: EventData) => void): EventResponse<T>;
  once(type: 'error', handler: (error: Error) => void): EventResponse<T>;
}

import { AbiInput, AbiOutput } from '../../../abi-properties';

export interface Web3ContractContext<
  TMethodsInterface,
  TMethodNamesEnum,
  TEventsInterface,
  TEventType
> {
  address: string;
  jsonInterface: AbiModel<TMethodNamesEnum, TEventType>;

  options: Options;

  clone(): Web3ContractContext<
    TMethodsInterface,
    TMethodNamesEnum,
    TEventsInterface,
    TEventType
  >;

  deploy(options: DeployOptions): ContractSendMethod;

  methods: TMethodsInterface;

  once(
    event: TEventType,
    callback: (error: Error, event: EventData) => void
  ): void;
  once(
    event: TEventType,
    options: EventOptions,
    callback: (error: Error, event: EventData) => void
  ): void;

  events: TEventsInterface & {
    allEvents(options: EventOptions): EventResponse;
    allEvents(
      options: EventOptions,
      callback: (error: Error, event: EventData) => void
    ): EventResponse;
  };

  getPastEvents(event: TEventType): Promise<EventData[]>;
  getPastEvents(
    event: TEventType,
    options: EventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: TEventType, options: EventOptions): Promise<EventData[]>;
  getPastEvents(
    event: TEventType,
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
  // tslint:disable-next-line: no-any
  arguments?: any[];
}

export interface ContractSendMethod {
  send(
    options: SendOptions,
    callback?: (err: Error, transactionHash: string) => void
    // tslint:disable-next-line: no-any
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
  once(type: 'transactionHash', handler: (hash: string) => void): PromiEvent<T>;

  once(
    type: 'receipt',
    handler: (receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  once(
    type: 'confirmation',
    handler: (confNumber: number, receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  once(type: 'error', handler: (error: Error) => void): PromiEvent<T>;

  on(type: 'transactionHash', handler: (hash: string) => void): PromiEvent<T>;

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
  topics: (string | string[])[];
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
}

export interface EventLog {
  event: string;
  address: string;
  // tslint:disable-next-line: no-any
  returnValues: any;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  // tslint:disable-next-line: no-any
  raw?: { data: string; topics: any[] };
}

export interface EventData {
  returnValues: {
    // tslint:disable-next-line: no-any
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
  // tslint:disable-next-line: no-any
  filter?: any;
  fromBlock?: number;
  toBlock?: 'latest' | number;
  // tslint:disable-next-line: no-any
  topics?: any[];
}

export interface EventResponse {
  on(type: 'data', handler: (event: EventData) => void): EventResponse;
  on(type: 'changed', handler: (event: EventData) => void): EventResponse;
  on(type: 'error', handler: (error: Error) => void): EventResponse;
}

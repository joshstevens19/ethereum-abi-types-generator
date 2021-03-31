import { Signer } from 'ethers';
import {
  BlockTag,
  Listener,
  Provider,
  TransactionRequest,
  TransactionResponse,
} from 'ethers/providers';
import { Interface } from 'ethers/utils';

export declare type EventFilter = {
  address?: string;
  topics?: string[];
  fromBlock?: BlockTag;
  toBlock?: BlockTag;
};

export type EthersContractContext<
  TMethods,
  TEventsContext,
  TEventType
> = EthersContract<TMethods, TEventsContext, TEventType> & TMethods;

interface Contract {
  readonly address: string;
  readonly interface: Interface;
  readonly signer: Signer;
  readonly provider: Provider;
  // readonly [name: string]: ContractFunction | any;
  readonly addressPromise: Promise<string>;
  readonly deployTransaction: TransactionResponse;
  fallback(overrides?: TransactionRequest): Promise<TransactionResponse>;
  // static isIndexed(value: any): value is Indexed;
  // tslint:disable-next-line: no-any
  emit(eventName: EventFilter | string, ...args: any[]): boolean;
  listenerCount(eventName?: EventFilter | string): number;
  listeners(eventName: EventFilter | string): Listener[];
}

interface EthersContract<TMethods, TEventsContext, TEventType>
  extends Contract {
  // readonly estimate: TMethods => Promise<BigNumber>;
  readonly functions: TMethods;
  // to do not exposing any string methods now which is nicer
  readonly filters: TEventsContext;
  deployed(): Promise<
    EthersContractContext<TMethods, TEventsContext, TEventType>
  >;
  _deployed(
    blockTag?: BlockTag
  ): Promise<EthersContractContext<TMethods, TEventsContext, TEventType>>;
  /**
   * Type any here so if you are using a different version of ethers then
   * installed it will still compile
   * @param signerOrProvider should be type of Wallet | Signer | Provider | string
   */
  connect(
    // tslint:disable-next-line: no-any
    signerOrProvider: any
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
  attach(
    addressOrName: string
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
  // need to overwrite the event filters for strongly typed events
  on(
    event: EventFilter | TEventType,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
  once(
    event: EventFilter | TEventType,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
  addListener(
    eventName: EventFilter | TEventType,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
  removeAllListeners(
    eventName: EventFilter | TEventType
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
  removeListener(
    eventName: TEventType,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventType>;
}

import { Contract, Signer } from 'ethers';
import { BlockTag, Listener, Provider } from 'ethers/providers';

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: BlockTag;
  toBlock?: BlockTag;
};

export type EthersContractContext<
  TMethods,
  TEventsContext,
  TEventEnums
> = EthersContract<TMethods, TEventsContext, TEventEnums> & TMethods;

// @ts-ignore
interface EthersContract<TMethods, TEventsContext, TEventEnums>
  extends Contract {
  // readonly estimate: TMethods => Promise<BigNumber>;
  readonly functions: TMethods;
  // to do not exposing any string methods now which is nicer
  readonly filters: TEventsContext;
  deployed(): Promise<
    EthersContractContext<TMethods, TEventsContext, TEventEnums>
  >;
  _deployed(
    blockTag?: BlockTag
  ): Promise<EthersContractContext<TMethods, TEventsContext, TEventEnums>>;
  connect(
    signerOrProvider: Signer | Provider | string
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
  attach(
    addressOrName: string
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
  // need to overwrite the event filters for strongly typed events
  on(
    event: EventFilter | TEventEnums,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
  once(
    event: EventFilter | TEventEnums,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
  addListener(
    eventName: EventFilter | TEventEnums,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
  removeAllListeners(
    eventName: EventFilter | TEventEnums
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
  removeListener(
    eventName: TEventEnums,
    listener: Listener
  ): EthersContractContext<TMethods, TEventsContext, TEventEnums>;
}

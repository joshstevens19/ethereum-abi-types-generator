import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethersv5';

export type ContractContext = EthersContractContextV5<
  Issue14,
  Issue14MethodNames,
  Issue14EventsContext,
  Issue14Events
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
export type Issue14Events = 'NewComet' | 'NewStakingComet' | 'RemoveComet';
export interface Issue14EventsContext {
  NewComet(...parameters: any): EventFilter;
  NewStakingComet(...parameters: any): EventFilter;
  RemoveComet(...parameters: any): EventFilter;
}
export type Issue14MethodNames =
  | 'updateSolarSystemStore'
  | 'addComet'
  | 'removeComet'
  | 'cometPosition'
  | 'getComet'
  | 'getStakingComet'
  | 'cometsFrom'
  | 'countCometIn';
export interface CartesianResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
}
export interface CenterResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
}
export interface LastResponse {
  distance: number;
  0: number;
  angle: BigNumber;
  1: BigNumber;
}
export interface OrbitResponse {
  center: CenterResponse;
  0: OrbitResponse;
  last: LastResponse;
  1: OrbitResponse;
}
export interface CometResponse {
  id: string;
  0: string;
  orbit: OrbitResponse;
  1: OrbitResponse;
  token: string;
  2: string;
  unit: BigNumber;
  3: BigNumber;
  balance: BigNumber;
  4: BigNumber;
  solarSystemID: BigNumber;
  5: BigNumber;
}
export interface CenterResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
}
export interface LastResponse {
  distance: number;
  0: number;
  angle: BigNumber;
  1: BigNumber;
}
export interface OrbitResponse {
  center: CenterResponse;
  0: OrbitResponse;
  last: LastResponse;
  1: OrbitResponse;
}
export interface StakingCometResponse {
  id: string;
  0: string;
  orbit: OrbitResponse;
  1: OrbitResponse;
  token: string;
  2: string;
  balance: BigNumber;
  3: BigNumber;
  rate: BigNumber;
  4: BigNumber;
  capacity: BigNumber;
  5: BigNumber;
  roverCount: BigNumber;
  6: BigNumber;
  cumulatedRate: BigNumber;
  7: BigNumber;
  collectable: BigNumber;
  8: BigNumber;
  lastUpdate: BigNumber;
  9: BigNumber;
  solarSystemID: BigNumber;
  10: BigNumber;
}
export interface CenterResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
}
export interface LastResponse {
  distance: number;
  0: number;
  angle: BigNumber;
  1: BigNumber;
}
export interface OrbitResponse {
  center: CenterResponse;
  0: OrbitResponse;
  last: LastResponse;
  1: OrbitResponse;
}
export interface CometResponse {
  id: string;
  0: string;
  orbit: OrbitResponse;
  1: OrbitResponse;
  token: string;
  2: string;
  unit: BigNumber;
  3: BigNumber;
  balance: BigNumber;
  4: BigNumber;
  solarSystemID: BigNumber;
  5: BigNumber;
}
export interface CenterResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
}
export interface LastResponse {
  distance: number;
  0: number;
  angle: BigNumber;
  1: BigNumber;
}
export interface OrbitResponse {
  center: CenterResponse;
  0: OrbitResponse;
  last: LastResponse;
  1: OrbitResponse;
}
export interface StakingCometResponse {
  id: string;
  0: string;
  orbit: OrbitResponse;
  1: OrbitResponse;
  token: string;
  2: string;
  balance: BigNumber;
  3: BigNumber;
  rate: BigNumber;
  4: BigNumber;
  capacity: BigNumber;
  5: BigNumber;
  roverCount: BigNumber;
  6: BigNumber;
  cumulatedRate: BigNumber;
  7: BigNumber;
  collectable: BigNumber;
  8: BigNumber;
  lastUpdate: BigNumber;
  9: BigNumber;
  solarSystemID: BigNumber;
  10: BigNumber;
}
export interface CometsFromResponse {
  result0: CometResponse[];
  0: CometResponse[];
  result1: StakingCometResponse[];
  1: StakingCometResponse[];
  length: 2;
}
export interface Issue14 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newStore Type: address, Indexed: false
   */
  updateSolarSystemStore(
    newStore: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param cometId Type: address, Indexed: false
   * @param x Type: int256, Indexed: false
   * @param y Type: int256, Indexed: false
   * @param distance Type: uint32, Indexed: false
   * @param rotationSpeed Type: uint16, Indexed: false
   * @param solarSystemID Type: uint256, Indexed: false
   */
  addComet(
    cometId: string,
    x: BigNumberish,
    y: BigNumberish,
    distance: BigNumberish,
    rotationSpeed: BigNumberish,
    solarSystemID: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param cometId Type: address, Indexed: false
   * @param solarSystemID Type: uint256, Indexed: false
   */
  removeComet(
    cometId: string,
    solarSystemID: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param cometId Type: address, Indexed: false
   * @param time Type: uint256, Indexed: false
   * @param solarSystemID Type: uint256, Indexed: false
   */
  cometPosition(
    cometId: string,
    time: BigNumberish,
    solarSystemID: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CartesianResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param cometId Type: address, Indexed: false
   * @param solarSystemID Type: uint256, Indexed: false
   */
  getComet(
    cometId: string,
    solarSystemID: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CometResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param cometId Type: address, Indexed: false
   * @param solarSystemID Type: uint256, Indexed: false
   */
  getStakingComet(
    cometId: string,
    solarSystemID: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<StakingCometResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param solarSystemID Type: uint256, Indexed: false
   */
  cometsFrom(
    solarSystemID: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CometsFromResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param solarSystemID Type: uint256, Indexed: false
   */
  countCometIn(
    solarSystemID: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
}

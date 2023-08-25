import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import {
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
  ContractTransaction,
} from 'ethers';

export type ContractContext = EthersContractContextV5<
  LensTuple,
  LensTupleMethodNames,
  LensTupleEventsContext,
  LensTupleEvents
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
export type LensTupleEvents = undefined;
export interface LensTupleEventsContext {}
export type LensTupleMethodNames = 'postWithSig';
export interface PostParamsRequest {
  profileId: BigNumberish;
  contentURI: string;
  actionModules: string[];
  actionModulesInitDatas: Arrayish[];
  referenceModule: string;
  referenceModuleInitData: Arrayish;
}
export interface SignatureRequest {
  signer: string;
  v: BigNumberish;
  r: Arrayish;
  s: Arrayish;
  deadline: BigNumberish;
}
export interface LensTuple {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param postParams Type: tuple, Indexed: false
   * @param signature Type: tuple, Indexed: false
   */
  postWithSig(
    postParams: PostParamsRequest,
    signature: SignatureRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}

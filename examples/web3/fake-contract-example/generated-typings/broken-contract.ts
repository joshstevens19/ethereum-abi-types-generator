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
  BrokenContract,
  BrokenContractMethodNames,
  BrokenContractEventsContext,
  BrokenContractEvents
>;
export type BrokenContractEvents =
  | 'Approval'
  | 'ApprovalForAll'
  | 'CarCreated'
  | 'ReceivedChild'
  | 'ReceivedERC20'
  | 'Transfer'
  | 'TransferChild'
  | 'TransferERC20';
export interface BrokenContractEventsContext {
  Approval(
    parameters: {
      filter?: {
        owner?: string | string[];
        approved?: string | string[];
        tokenId?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  ApprovalForAll(
    parameters: {
      filter?: { owner?: string | string[]; operator?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  CarCreated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  ReceivedChild(
    parameters: {
      filter?: {
        _from?: string | string[];
        _tokenId?: string | string[];
        _childContract?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  ReceivedERC20(
    parameters: {
      filter?: {
        _from?: string | string[];
        _tokenId?: string | string[];
        _erc20Contract?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Transfer(
    parameters: {
      filter?: {
        from?: string | string[];
        to?: string | string[];
        tokenId?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  TransferChild(
    parameters: {
      filter?: {
        tokenId?: string | string[];
        _to?: string | string[];
        _childContract?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  TransferERC20(
    parameters: {
      filter?: {
        _tokenId?: string | string[];
        _to?: string | string[];
        _erc20Contract?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type BrokenContractMethodNames =
  | 'new'
  | 'approve'
  | 'attachComponent'
  | 'balanceOf'
  | 'balanceOfERC20'
  | 'childContractByIndex'
  | 'childExists'
  | 'childTokenByIndex'
  | 'countOfCarssByOwner'
  | 'createCar'
  | 'detachComponent'
  | 'erc20ContractByIndex'
  | 'getApproved'
  | 'getCars'
  | 'getChild'
  | 'getComponents'
  | 'getData'
  | 'getDetachedComponents'
  | 'getERC20'
  | 'getFactory'
  | 'getLastTokenId'
  | 'isApprovedForAll'
  | 'mint'
  | 'name'
  | 'onERC721Received'
  | 'onERC721Received'
  | 'ownerOf'
  | 'ownerOfChild'
  | 'rootOwnerOf'
  | 'rootOwnerOfChild'
  | 'safeTransferChild'
  | 'safeTransferChild'
  | 'safeTransferFrom'
  | 'safeTransferFrom'
  | 'setApprovalForAll'
  | 'setFactory'
  | 'supportsInterface'
  | 'symbol'
  | 'tokenFallback'
  | 'tokenURI'
  | 'totalChildContracts'
  | 'totalChildTokens'
  | 'totalERC20Contracts'
  | 'transferChild'
  | 'transferChildToParent'
  | 'transferERC20'
  | 'transferERC223'
  | 'transferFrom';
export interface OwnedCarsResponse {
  tokenId: string;
  attachedComponents: [string, string, string, string];
  detachedComponents: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  owner: string;
  detachedComponentsCount: string;
}
export interface ResultResponse {
  name: string;
  value: string;
}
export interface OwnerOfChildResponse {
  parentTokenOwner: string;
  parentTokenId: string;
}
export interface BrokenContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _approved Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  approve(_approved: string, _tokenId: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param carTokenId Type: uint256, Indexed: false
   * @param componentType Type: uint8, Indexed: false
   * @param componentTokenId Type: uint256, Indexed: false
   */
  attachComponent(
    carTokenId: string,
    componentType: string | number,
    componentTokenId: string
  ): MethodConstantReturnContext<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenOwner Type: address, Indexed: false
   */
  balanceOf(_tokenOwner: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _erc20Contract Type: address, Indexed: false
   */
  balanceOfERC20(
    _tokenId: string,
    _erc20Contract: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _index Type: uint256, Indexed: false
   */
  childContractByIndex(
    _tokenId: string,
    _index: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   */
  childExists(
    _childContract: string,
    _childTokenId: string
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _childContract Type: address, Indexed: false
   * @param _index Type: uint256, Indexed: false
   */
  childTokenByIndex(
    _tokenId: string,
    _childContract: string,
    _index: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  countOfCarssByOwner(owner: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  createCar(_owner: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param carTokenId Type: uint256, Indexed: false
   * @param componentType Type: uint8, Indexed: false
   * @param componentTokenId Type: uint256, Indexed: false
   */
  detachComponent(
    carTokenId: string,
    componentType: string | number,
    componentTokenId: string
  ): MethodConstantReturnContext<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _index Type: uint256, Indexed: false
   */
  erc20ContractByIndex(
    _tokenId: string,
    _index: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getApproved(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  getCars(owner: string): MethodConstantReturnContext<OwnedCarsResponse[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   */
  getChild(
    _from: string,
    _tokenId: string,
    _childContract: string,
    _childTokenId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param carTokenId Type: uint256, Indexed: false
   */
  getComponents(
    carTokenId: string
  ): MethodConstantReturnContext<[string, string, string, string]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getData(tokenId: string): MethodConstantReturnContext<ResultResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param carTokenId Type: uint256, Indexed: false
   */
  getDetachedComponents(
    carTokenId: string
  ): MethodConstantReturnContext<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  >;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _erc20Contract Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  getERC20(
    _from: string,
    _tokenId: string,
    _erc20Contract: string,
    _value: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _componentType Type: uint256, Indexed: false
   */
  getFactory(_componentType: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLastTokenId(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _operator Type: address, Indexed: false
   */
  isApprovedForAll(
    _owner: string,
    _operator: string
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   */
  mint(_to: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param _from Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  onERC721Received(
    parameter0: string,
    _from: string,
    _childTokenId: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  onERC721Received(
    _from: string,
    _childTokenId: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  ownerOf(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   */
  ownerOfChild(
    _childContract: string,
    _childTokenId: string
  ): MethodConstantReturnContext<OwnerOfChildResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  rootOwnerOf(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   */
  rootOwnerOfChild(
    _childContract: string,
    _childTokenId: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _fromTokenId Type: uint256, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   */
  safeTransferChild(
    _fromTokenId: string,
    _to: string,
    _childContract: string,
    _childTokenId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _fromTokenId Type: uint256, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferChild(
    _fromTokenId: string,
    _to: string,
    _childContract: string,
    _childTokenId: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(
    _from: string,
    _to: string,
    _tokenId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    _from: string,
    _to: string,
    _tokenId: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _operator Type: address, Indexed: false
   * @param _approved Type: bool, Indexed: false
   */
  setApprovalForAll(_operator: string, _approved: boolean): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param componentType Type: uint256, Indexed: false
   * @param contractAddress Type: address, Indexed: false
   */
  setFactory(
    componentType: string,
    contractAddress: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: string | number[]
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  tokenFallback(
    _from: string,
    _value: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  totalChildContracts(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _childContract Type: address, Indexed: false
   */
  totalChildTokens(
    _tokenId: string,
    _childContract: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  totalERC20Contracts(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _fromTokenId Type: uint256, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   */
  transferChild(
    _fromTokenId: string,
    _to: string,
    _childContract: string,
    _childTokenId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _fromTokenId Type: uint256, Indexed: false
   * @param _toContract Type: address, Indexed: false
   * @param _toTokenId Type: uint256, Indexed: false
   * @param _childContract Type: address, Indexed: false
   * @param _childTokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  transferChildToParent(
    _fromTokenId: string,
    _toContract: string,
    _toTokenId: string,
    _childContract: string,
    _childTokenId: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _erc20Contract Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   */
  transferERC20(
    _tokenId: string,
    _to: string,
    _erc20Contract: string,
    _value: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _erc223Contract Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  transferERC223(
    _tokenId: string,
    _to: string,
    _erc223Contract: string,
    _value: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    _from: string,
    _to: string,
    _tokenId: string
  ): MethodReturnContext;
}

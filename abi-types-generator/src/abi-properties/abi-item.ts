export interface AbiItem {
  anonymous?: boolean;
  constant?: boolean;
  inputs?: AbiInput[];
  name?: string;
  outputs?: AbiOutput[];
  payable?: boolean;
  stateMutability?: StateMutabilityType;
  type: AbiType;
  gas?: number;
}

export interface AbiInput {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiInput[];
}

export interface AbiOutput {
  name: string;
  type: string;
  components?: AbiOutput[];
}

export type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable';
export type AbiType = 'function' | 'constructor' | 'event' | 'fallback';

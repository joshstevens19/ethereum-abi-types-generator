import { SolidityType } from './solidity-type';

export interface AbiInput {
  name: string;
  type: SolidityType;
  indexed?: boolean;
  components?: AbiInput[];
}

import { SolidityType } from './solidity-type';

export interface AbiOutput {
  name: string;
  type: SolidityType;
  components?: AbiOutput[];
}

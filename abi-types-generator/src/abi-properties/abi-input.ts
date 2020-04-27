import { InputOutputType } from './input-output-type';

export interface AbiInput {
  name: string;
  type: InputOutputType;
  indexed?: boolean;
  components?: AbiInput[];
}

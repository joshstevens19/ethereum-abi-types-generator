import { InputOutputType } from './input-output-type';

export interface AbiOutput {
  name: string;
  type: InputOutputType;
  components?: AbiOutput[];
}

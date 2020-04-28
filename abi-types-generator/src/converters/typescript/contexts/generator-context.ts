import { Options } from 'prettier';
import { Provider } from '../enums/provider';

export interface GeneratorContext {
  provider: Provider;
  abiPath: string;
  outputPath: string;
  name?: string | undefined;
  prettierOptions?: Options | undefined;
}

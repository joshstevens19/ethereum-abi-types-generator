import { Provider } from '../enums/provider';

export interface GeneratorContext {
  provider: Provider;
  abiPath: string;
  outputPath: string;
}

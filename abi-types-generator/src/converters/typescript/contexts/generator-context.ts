import { Provider } from '../enums/provider';

export interface GeneratorContext {
  provider: Provider;
  abiFileLocation: string;
  outputPathDirectory?: string | undefined;
  name?: string | undefined;
  watch?: boolean;
}

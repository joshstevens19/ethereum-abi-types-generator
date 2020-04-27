import GenerateFunctions from './generate-functions';
import { Provider } from './provider';

new GenerateFunctions(Provider.etherjs).buildInterfaceFromFunctions();

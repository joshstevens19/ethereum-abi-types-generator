import { AbiPropertiesMock } from '../../abi-properties/mocks/abi-properties.mock';
import Helpers from '../../common/helpers';
import { EthersFactory } from './ethers-factory';

describe('EthersFactory', () => {
  let ethersFactory: EthersFactory;

  beforeEach(() => {
    ethersFactory = new EthersFactory();
  });

  describe('buildEthersInterfaces', () => {
    it('should round correct interface', () => {
      expect(
        Helpers.removeAllWhiteSpace(
          ethersFactory.buildEthersInterfaces('TestAbi')
        )
      ).toEqual(
        Helpers.removeAllWhiteSpace(`
          import { ContractTransaction } from "ethers";
          import { EthersContractContext } from "ethereum-abi-types-generator";
          export type ContractContext = EthersContractContext<
          TestAbi,
          TestAbiEventsContext,
          TestAbiEvents
        >;

        export declare type EventFilter = {
            address?: string;
            topics?: Array<string>;
            fromBlock?: string | number;
            toBlock?: string | number;
          };
        `)
      );
    });
  });

  describe('buildEventInterfaceProperties', () => {
    it('should return empty string if 0 length abi items', () => {
      expect(ethersFactory.buildEventInterfaceProperties([])).toEqual('');
    });

    it('should build all events from the ABI', () => {
      expect(
        ethersFactory.buildEventInterfaceProperties(
          AbiPropertiesMock.AbiItemsMock
        )
      ).toEqual('NewExchange(...parameters: any): EventFilter;');
    });
  });

  describe('buildMethodReturnContext', () => {
    it('should return `Promise<void>` if abiItem.constant === true', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsMock.find((m) => m.constant)!
        )
      ).toEqual(': Promise<void>');
    });

    it('should return `Promise<ContractTransaction>` if abiItem.payable === true', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenMock.find((m) => !m.constant && m.payable)!
        )
      ).toEqual(': Promise<ContractTransaction>');
    });

    it('should return `Promise<ContractTransaction>` if abiItem.constant === false and payable === false', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenMock.find((m) => !m.constant && !m.payable)!
        )
      ).toEqual(': Promise<ContractTransaction>');
    });
  });
});

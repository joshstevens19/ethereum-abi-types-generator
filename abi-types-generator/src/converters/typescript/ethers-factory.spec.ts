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
          import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
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

          export interface ContractTransactionOverrides {
            /**
             * The maximum units of gas for the transaction to use
             */
            gasLimit?: number;
            /**
             * The price (in wei) per unit of gas
             */
            gasPrice?: BigNumber | string | number | Promise<any>;
            /**
             * The nonce to use in the transaction
             */
            nonce?: number;
            /**
             * The amount to send with the transaction (i.e. msg.value)
             */
            value?: BigNumber | string | number | Promise<any>;
            /**
             * The chain ID (or network ID) to use
             */
            chainId?: number;
          }

          export interface ContractCallOverrides {
            /**
             * The address to execute the call as
             */
            from?: string;
            /**
             * The maximum units of gas for the transaction to use
             */
            gasLimit?: number;
          }
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
    it('should return `Promise<void>` if abiItem.constant === true || abiItem.stateMutability === \'view\' || abiItem.stateMutability === \'pure\'', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsMock.find((m) => m.constant || m.stateMutability === 'view' || m.stateMutability === 'pure')!
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

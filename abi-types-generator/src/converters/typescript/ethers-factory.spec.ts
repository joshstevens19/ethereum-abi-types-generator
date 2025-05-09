import { AbiPropertiesMock } from '../../abi-properties/mocks/abi-properties.mock';
import Helpers from '../../common/helpers';
import { EthersVersion } from './enums/ethers-version';
import { EthersFactory } from './ethers-factory';

describe('EthersFactory', () => {
  let ethersFactory: EthersFactory;

  beforeEach(() => {
    ethersFactory = new EthersFactory();
  });

  describe('buildEthersInterfaces', () => {
    it('should return correct interface for ethers version 4 or below', () => {
      expect(
        Helpers.removeAllWhiteSpace(
          ethersFactory.buildEthersInterfaces(
            'TestAbi',
            EthersVersion.four_or_below
          )
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

    it('should return correct interface for ethers version 5', () => {
      expect(
        Helpers.removeAllWhiteSpace(
          ethersFactory.buildEthersInterfaces('TestAbi', EthersVersion.five)
        )
      ).toEqual(
        Helpers.removeAllWhiteSpace(`
          import { ContractTransaction,
                    ContractInterface,
                    BytesLike as Arrayish,
                    BigNumber,
                    BigNumberish,
                    EventFilter,
                    PayableOverrides,
                    Overrides,
                    CallOverrides } from "ethers";
           import { EthersContractContextV5 } from "ethereum-abi-types-generator";

          export type ContractContext = EthersContractContextV5<
            TestAbi,
            TestAbiMethodNames,
            TestAbiEventsContext,
            TestAbiEvents
          >;
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

    it('should return `Promise<void>` if abiItem.stateMutability === `view`', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenV2Mock.find(
            (m) => m.stateMutability === `view`
          )!
        )
      ).toEqual(': Promise<void>');
    });

    it('should return `Promise<void>` if abiItem.stateMutability === `pure`', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsV2Mock.find(
            (m) => m.stateMutability === `pure`
          )!
        )
      ).toEqual(': Promise<void>');
    });

    it('should return `Promise<ContractTransaction>` if abiItem.payable === true', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenMock.find(
            (m) => !Helpers.isNeverModifyBlockchainState(m) && m.payable
          )!
        )
      ).toEqual(': Promise<ContractTransaction>');
    });

    it('should return `Promise<ContractTransaction>` if abiItem.stateMutability === `payable`', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsV2Mock.find(
            (m) => !m.constant && m.stateMutability === 'payable'
          )!
        )
      ).toEqual(': Promise<ContractTransaction>');
    });

    it('should return `Promise<ContractTransaction>` if not accepts ether and cannot modify blockchain state', () => {
      expect(
        ethersFactory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenMock.find(
            (m) =>
              !Helpers.isNeverModifyBlockchainState(m) &&
              !Helpers.isAcceptsEther(m)
          )!
        )
      ).toEqual(': Promise<ContractTransaction>');
    });
  });
});

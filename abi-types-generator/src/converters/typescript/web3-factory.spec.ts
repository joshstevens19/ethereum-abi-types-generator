import { AbiPropertiesMock } from '../../abi-properties/mocks/abi-properties.mock';
import Helpers from '../../common/helpers';
import { Web3Factory } from './web3-factory';

describe('Web3Factory', () => {
  let web3Factory: Web3Factory;

  beforeEach(() => {
    web3Factory = new Web3Factory();
  });

  describe('buildWeb3Interfaces', () => {
    it('should round correct interface', () => {
      expect(
        Helpers.removeAllWhiteSpace(web3Factory.buildWeb3Interfaces('TestAbi'))
      ).toEqual(
        Helpers.removeAllWhiteSpace(`
         import BN from "bn.js";
         import BigNumber from'bignumber.js';
         import { PromiEvent, TransactionReceipt, EventResponse, EventData, Web3ContractContext } from "ethereum-abi-types-generator";

         export interface CallOptions {
          from?: string;
          gasPrice?: string;
          gas?: number;
        }

        export interface SendOptions {
          from: string;
          value?: number | string | BN | BigNumber;
          gasPrice?: string;
          gas?: number;
        }

        export interface EstimateGasOptions {
          from?: string;
          value?: number | string | BN | BigNumber;
          gas?: number;
        }

        export interface MethodPayableReturnContext {
          send(options: SendOptions):PromiEvent<TransactionReceipt>;
          send(
              options: SendOptions,
              callback: (error: Error, result: any) => void
          ): PromiEvent<TransactionReceipt>;
          estimateGas(options: EstimateGasOptions): Promise<number>;
          estimateGas(
              options: EstimateGasOptions,
              callback: (error: Error, result: any) => void
          ): Promise<number>;
          encodeABI(): string;
        }

        export interface MethodConstantReturnContext<TCallReturn> {
          call(): Promise<TCallReturn>;
          call(options: CallOptions): Promise<TCallReturn>;
          call(
          options: CallOptions,
          callback: (error: Error, result: TCallReturn) => void
          ): Promise<TCallReturn>;
          encodeABI():string;
        }

        export interface MethodReturnContext extends MethodPayableReturnContext {}

        export type ContractContext = Web3ContractContext<
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
      expect(web3Factory.buildEventInterfaceProperties([])).toEqual('');
    });

    it('should build all events from the ABI', () => {
      expect(
        Helpers.removeAllWhiteSpace(
          web3Factory.buildEventInterfaceProperties(
            AbiPropertiesMock.AbiItemsMock
          )
        )
      ).toEqual(
        Helpers.removeAllWhiteSpace(`
          NewExchange(parameters:
          {
              filter?: {token?: string | string[],exchange?: string | string[],};
              fromBlock?: number;
              toBlock?: 'latest' | number;
              topics?: string[]
          },
          callback?: (error: Error, event: EventData) => void): EventResponse;
      `)
      );
    });
  });

  describe('buildMethodReturnContext', () => {
    it('should return `MethodConstantReturnContext<void>` if abiItem.constant === true', () => {
      expect(
        web3Factory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsMock.find((m) => m.constant)!
        )
      ).toEqual(': MethodConstantReturnContext<void>');
    });

    it('should return `MethodConstantReturnContext<void>` if abiItem.stateMutability === `view`', () => {
      expect(
        web3Factory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenV2Mock.find(
            (m) => m.stateMutability === 'view'
          )!
        )
      ).toEqual(': MethodConstantReturnContext<void>');
    });

    it('should return `MethodConstantReturnContext<void>` if abiItem.stateMutability === `pure`', () => {
      expect(
        web3Factory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsV2Mock.find(
            (m) => m.stateMutability === 'pure'
          )!
        )
      ).toEqual(': MethodConstantReturnContext<void>');
    });

    it('should return `MethodPayableReturnContext` abiItem.payable === true', () => {
      expect(
        web3Factory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenMock.find(
            (m) => !Helpers.isNeverModifyBlockchainState(m) && m.payable
          )!
        )
      ).toEqual(': MethodPayableReturnContext');
    });

    it('should return `MethodPayableReturnContext` abiItem.stateMutability === `payable`', () => {
      expect(
        web3Factory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiItemsV2Mock.find(
            (m) => !m.constant && m.stateMutability === 'payable'
          )!
        )
      ).toEqual(': MethodPayableReturnContext');
    });

    it('should return `MethodReturnContext` if not accepts ether and cannot modify blockchain state', () => {
      expect(
        web3Factory.buildMethodReturnContext(
          'void',
          AbiPropertiesMock.AbiTokenMock.find(
            (m) =>
              !Helpers.isNeverModifyBlockchainState(m) &&
              !Helpers.isAcceptsEther(m)
          )!
        )
      ).toEqual(': MethodReturnContext');
    });
  });
});

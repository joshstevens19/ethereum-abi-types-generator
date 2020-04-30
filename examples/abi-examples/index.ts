import { AbiItem } from 'ethereum-abi-types-generator';

export class AbiExamples {
  /**
   * The uniswap factory contract address (mainnet only)
   */
  public static factoryAddress = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95';

  /**
   * The uniswap factory abi
   */
  public static factoryAbi = [
    {
      name: 'NewExchange',
      inputs: [
        { type: 'address', name: 'token', indexed: true },
        { type: 'address', name: 'exchange', indexed: true },
      ],
      anonymous: false,
      type: 'event',
    },
    {
      name: 'initializeFactory',
      outputs: [],
      inputs: [{ type: 'address', name: 'template' }],
      constant: false,
      payable: false,
      type: 'function',
      gas: 35725,
    },
    {
      name: 'createExchange',
      outputs: [{ type: 'address', name: 'out' }],
      inputs: [{ type: 'address', name: 'token' }],
      constant: false,
      payable: false,
      type: 'function',
      gas: 187911,
    },
    {
      name: 'getExchange',
      outputs: [{ type: 'address', name: 'out' }],
      inputs: [{ type: 'address', name: 'token' }],
      constant: true,
      payable: false,
      type: 'function',
      gas: 715,
    },
    {
      name: 'getToken',
      outputs: [{ type: 'address', name: 'out' }],
      inputs: [{ type: 'address', name: 'exchange' }],
      constant: true,
      payable: false,
      type: 'function',
      gas: 745,
    },
    {
      name: 'getTokenWithId',
      outputs: [{ type: 'address', name: 'out' }],
      inputs: [{ type: 'uint256', name: 'token_id' }],
      constant: true,
      payable: false,
      type: 'function',
      gas: 736,
    },
    {
      name: 'exchangeTemplate',
      outputs: [{ type: 'address', name: 'out' }],
      inputs: [],
      constant: true,
      payable: false,
      type: 'function',
      gas: 633,
    },
    {
      name: 'tokenCount',
      outputs: [{ type: 'uint256', name: 'out' }],
      inputs: [],
      constant: true,
      payable: false,
      type: 'function',
      gas: 663,
    },
  ];

  // used for giffs
  public static YOUR_ABI = ('' as unknown) as AbiItem[];

  // used for giffs
  public static YOUR_CONTRACT_ADDRESS = AbiExamples.factoryAddress;
}

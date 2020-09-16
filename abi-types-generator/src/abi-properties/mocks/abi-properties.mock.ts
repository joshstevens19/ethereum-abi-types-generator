import { AbiItem } from '../abi-item';

export class AbiPropertiesMock {
  public static get AbiItemsMock(): AbiItem[] {
    return [
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
    ] as AbiItem[];
  }

  public static get AbiItemsV2Mock(): AbiItem[] {
    return [
      {
        name: 'payableMock',
        outputs: [],
        inputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        name: 'pureMock',
        outputs: [{ type: 'uint256', name: 'aPlusB' }],
        inputs: [
          {
            internalType: 'uint256',
            name: 'a',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'b',
            type: 'uint256'
          }
        ],
        stateMutability: 'pure',
        type: 'function',
      }
    ] as AbiItem[];
  }

  public static get AbiTokenMock(): AbiItem[] {
    return [
      {
        name: 'Transfer',
        inputs: [
          { type: 'address', name: '_from', indexed: true },
          { type: 'address', name: '_to', indexed: true },
          { type: 'uint256', name: '_value', indexed: false },
        ],
        anonymous: false,
        type: 'event',
      },
      {
        name: 'Approval',
        inputs: [
          { type: 'address', name: '_owner', indexed: true },
          { type: 'address', name: '_spender', indexed: true },
          { type: 'uint256', name: '_value', indexed: false },
        ],
        anonymous: false,
        type: 'event',
      },
      {
        name: '__init__',
        outputs: [],
        inputs: [
          { type: 'bytes32', name: '_name' },
          { type: 'bytes32', name: '_symbol' },
          { type: 'uint256', name: '_decimals' },
          { type: 'uint256', name: '_supply' },
        ],
        constant: false,
        payable: false,
        type: 'constructor',
      },
      {
        name: 'deposit',
        outputs: [],
        inputs: [],
        constant: false,
        payable: true,
        type: 'function',
        gas: 74279,
      },
      {
        name: 'withdraw',
        outputs: [{ type: 'bool', name: 'out' }],
        inputs: [{ type: 'uint256', name: '_value' }],
        constant: false,
        payable: false,
        type: 'function',
        gas: 108706,
      },
      {
        name: 'totalSupply',
        outputs: [{ type: 'uint256', name: 'out' }],
        inputs: [],
        constant: true,
        payable: false,
        type: 'function',
        gas: 543,
      },
      {
        name: 'balanceOf',
        outputs: [{ type: 'uint256', name: 'out' }],
        inputs: [{ type: 'address', name: '_owner' }],
        constant: true,
        payable: false,
        type: 'function',
        gas: 745,
      },
      {
        name: 'transfer',
        outputs: [{ type: 'bool', name: 'out' }],
        inputs: [
          { type: 'address', name: '_to' },
          { type: 'uint256', name: '_value' },
        ],
        constant: false,
        payable: false,
        type: 'function',
        gas: 74698,
      },
      {
        name: 'transferFrom',
        outputs: [{ type: 'bool', name: 'out' }],
        inputs: [
          { type: 'address', name: '_from' },
          { type: 'address', name: '_to' },
          { type: 'uint256', name: '_value' },
        ],
        constant: false,
        payable: false,
        type: 'function',
        gas: 110600,
      },
      {
        name: 'approve',
        outputs: [{ type: 'bool', name: 'out' }],
        inputs: [
          { type: 'address', name: '_spender' },
          { type: 'uint256', name: '_value' },
        ],
        constant: false,
        payable: false,
        type: 'function',
        gas: 37888,
      },
      {
        name: 'allowance',
        outputs: [{ type: 'uint256', name: 'out' }],
        inputs: [
          { type: 'address', name: '_owner' },
          { type: 'address', name: '_spender' },
        ],
        constant: true,
        payable: false,
        type: 'function',
        gas: 1025,
      },
      {
        name: 'name',
        outputs: [{ type: 'bytes32', name: 'out' }],
        inputs: [],
        constant: true,
        payable: false,
        type: 'function',
        gas: 723,
      },
      {
        name: 'symbol',
        outputs: [{ type: 'bytes32', name: 'out' }],
        inputs: [],
        constant: true,
        payable: false,
        type: 'function',
        gas: 753,
      },
      {
        name: 'decimals',
        outputs: [{ type: 'uint256', name: 'out' }],
        inputs: [],
        constant: true,
        payable: false,
        type: 'function',
        gas: 783,
      },
    ] as AbiItem[];
  }

  public static get AbiTokenV2Mock(): AbiItem[] {
    return [
      {
        name: '__init__',
        inputs: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        name: 'Approval',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        name: 'Transfer',
        type: 'event'
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address'
          }
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256'
          }
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256'
          }
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ] as AbiItem[];
  }
}

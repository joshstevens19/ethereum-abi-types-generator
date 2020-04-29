import { AbiItem } from '../abi-item';

export class AbiPropertiesMock {
  public static get AbiItemsMock() {
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

  public static get AbiItemsV2Mock() {
    return [
      {
        constant: false,
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_newOwner',
            type: 'address',
          },
        ],
        name: 'changeOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            components: [
              {
                name: 'ID',
                type: 'bytes32',
              },
              {
                name: 'percentage',
                type: 'uint256',
              },
              {
                name: 'duration',
                type: 'uint256',
              },
              {
                name: 'revenueCalculationMethod',
                type: 'uint256',
              },
            ],
            name: 'o',
            type: 'tuple',
          },
        ],
        name: 'createOffer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'offerID',
            type: 'bytes32',
          },
          {
            name: 'affiliate',
            type: 'address',
          },
          {
            name: 'validation',
            type: 'bool',
          },
        ],
        name: 'setAffiliateValidation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'player',
            type: 'address',
          },
          {
            name: 'affiliate',
            type: 'address',
          },
          {
            name: 'offerID',
            type: 'bytes32',
          },
          {
            name: 'campaignID',
            type: 'bytes32',
          },
        ],
        name: 'setAffiliation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'a',
            type: 'address',
          },
        ],
        name: 'setApprovedOperatorsListAddress',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'affiliations',
        outputs: [
          {
            name: 'affiliate',
            type: 'address',
          },
          {
            name: 'offerID',
            type: 'bytes32',
          },
          {
            name: 'creationTime',
            type: 'uint256',
          },
          {
            name: 'campaignID',
            type: 'bytes32',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
          {
            name: '',
            type: 'bytes32',
          },
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'affiliationValidations',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'approvedOperatorsListAddress',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'player',
            type: 'address',
          },
          {
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'getAffiliation',
        outputs: [
          {
            name: 'affiliate',
            type: 'address',
          },
          {
            name: 'percentage',
            type: 'uint256',
          },
          {
            name: 'revenueCalculationMethod',
            type: 'uint256',
          },
          {
            name: 'campaignID',
            type: 'bytes32',
          },
          {
            name: 'offerID',
            type: 'bytes32',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        name: 'offers',
        outputs: [
          {
            name: 'ID',
            type: 'bytes32',
          },
          {
            name: 'percentage',
            type: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint256',
          },
          {
            name: 'revenueCalculationMethod',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ] as AbiItem[];
  }

  public static get AbiTokenMock() {
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
}

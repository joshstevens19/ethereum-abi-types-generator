import { AbiItem } from 'ethereum-abi-types-generator';

export class AbiExamples {
  /**
   * Mainnet fun token contract address
   */
  public static funContractAddress =
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

  /**
   * Fun token decimal places
   */
  public static funDecimalPlaces = 8;

  /**
   * The token abi (when it compiled it lives in the dist so map it back to root)
   */
  public static tokenAbi = require('../../abi-examples/token-abi');

  /**
   * The uniswap factory contract address (mainnet only)
   */
  public static uniswapFactoryAddress =
    '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95';

  /**
   * The uniswap factory abi (when it compiled it lives in the dist so map it back to root)
   */
  public static uniswapFactoryAbi = require('../../abi-examples/uniswap-factory-abi');

  /**
   * The uniswap exchange abi (when it compiled it lives in the dist so map it back to root)
   */
  public static uniswapExchangeAbi = require('../../abi-examples/uniswap-exchange-abi');

  // used for giffs and fake contract example
  public static YOUR_ABI = ('' as unknown) as AbiItem[];

  // used for giffs and fake contract example
  public static YOUR_CONTRACT_ADDRESS = AbiExamples.funContractAddress;
}

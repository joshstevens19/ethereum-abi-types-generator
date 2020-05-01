import { ethers, utils } from 'ethers';
import { BigNumber } from 'ethers/utils';
import { AbiExamples } from '../../abi-examples';
import { ContractContext as TokenContractContext } from './generated-typings/token-contract';
import { ContractContext as UniswapExchangeContractContext } from './generated-typings/uniswap-exchange-contract';
import { ContractContext as UniswapFactoryContractContext } from './generated-typings/uniswap-factory-contract';

const mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

// Connect to the network
const customHttpProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/280bb5b627394709938a7cc0b71a4a58'
);

class UniswapStronglyTypedExample {
  // 0.5%
  private readonly SLIPPAGE = 0.05;
  // trade lasts for 15 minutes before it expiries
  private readonly TRADE_DEADLINE_SECONDS = 15 * 60;

  private _factoryContract: UniswapFactoryContractContext = this.buildUniswapFactoryContract();

  constructor() {}

  /**
   * Gets how much token they will get for their trade minus all fees
   * @param ethAmount The eth amount
   */
  public async getTokenTradeAmountEthToErc20(
    ethAmount: BigNumber
  ): Promise<BigNumber> {
    const exchangeContract = await this.getExchangeContractForToken(
      AbiExamples.funContractAddress
    );

    const price = await exchangeContract.getEthToTokenInputPrice(ethAmount);

    this.logUniswapOutput(`Got the eth to token input price - ${price}`);
    // Uniswap class - Got the eth to token input price - 102465873454

    // const tokenAmount = new BigNumber(
    //   new bigNumberJs(price.toString())
    //     .shiftedBy(AbiExamples.funDecimalPlaces * -1)
    //     .toString()
    // );

    const tokenAmount = price;

    this.logUniswapOutput(`Got the fun token amount - ${tokenAmount}`);
    // Uniswap class - Got the fun token amount - 1024.65873454

    // add some slippage
    const tokenAmountWithSlippage = tokenAmount.sub(
      tokenAmount.mul(utils.hexlify(this.SLIPPAGE)).toString()
    );

    this.logUniswapOutput(
      `Fun token amount with the slippage taken off - ${tokenAmountWithSlippage.toString()}`
    );
    // Uniswap class - Fun token amount with the slippage taken off - 973.425797813

    return tokenAmountWithSlippage;
  }

  /**
   * Get max amount of fun tokens you can buy
   */
  public async maxAmountOfTokensToBuy(): Promise<BigNumber> {
    const exchangeAddress = await this.getExchangeAddress(
      AbiExamples.funContractAddress
    );

    const tokenContract = this.getTokenContract(AbiExamples.funContractAddress);

    const tokenReserve = await tokenContract.balanceOf(exchangeAddress);

    this.logUniswapOutput(
      `Got the token reserve raw value - ${tokenReserve.toString()}`
    );
    // Uniswap class - Got the token reserve raw value - 1868161858283796

    return tokenReserve;

    // const tokenReserve = new BigNumber(tokenReserveRaw).shiftedBy(
    //   AbiExamples.funDecimalPlaces * -1
    // );

    // this.logUniswapOutput(
    //   `Token reserve raw value formatted to fun decimal places - ${tokenReserve}`
    // );
    // // Uniswap class - Token reserve raw value formatted to fun decimal places - 18681618.58283796

    return tokenReserve;
  }

  /**
   * Make the trade encoding the data and sending the transaction
   * @param ethAmount The eth amount
   * @param minTokens The min tokens
   */
  public async trade(
    ethAmount: BigNumber,
    minTokens: BigNumber
  ): Promise<string> {
    const exchangeAddress = await this.getExchangeAddress(
      AbiExamples.funContractAddress
    );

    const exchangeContract = this.getExchangeContractForTokenByExchangeAddress(
      exchangeAddress
    );

    // you can use the same etherjs flows to send and sign transactions
    // `contract.connect` will return a `ContractContext` so will still have
    // all the typings exposed for you
    const privateKey =
      '0x0123456789012345678901234567890123456789012345678901234567890123';
    const wallet = new ethers.Wallet(privateKey, customHttpProvider);

    // Create a new instance of the Contract with a Signer, which allows
    // update methods
    const contractWithSigner = exchangeContract.connect(wallet);

    const tx = await contractWithSigner.ethToTokenSwapInput(
      minTokens,
      this.generateTradeDeadlineUnixTime(),
      { value: utils.parseEther(ethAmount.toString()) }
    );

    this.logUniswapOutput(`Contract transaction ${tx.hash}`);
    // Uniswap class - Contract transaction 0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364

    // The operation is NOT complete yet; we must wait until it is mined
    await tx.wait();

    return tx.hash!;
  }

  /**
   * Generates the trade dateline unix time
   */
  private generateTradeDeadlineUnixTime(): string {
    const timestamp =
      ((new Date().getTime() / 1e3) | 0) + this.TRADE_DEADLINE_SECONDS;

    return timestamp.toString();
  }

  /**
   * Get the exchange contract for the token
   * @param erc20TokenContract The erc20 token contract
   */
  private async getExchangeContractForToken(
    erc20TokenContract: string
  ): Promise<UniswapExchangeContractContext> {
    const exchangeAddress = await this.getExchangeAddress(erc20TokenContract);

    return this.getExchangeContractForTokenByExchangeAddress(exchangeAddress);
  }

  /**
   * Gets the exchange address for the erc20 token contract
   * @param erc20TokenContract The erc20 token contract
   */
  private async getExchangeAddress(
    erc20TokenContract: string
  ): Promise<string> {
    const exchangeAddress = await this._factoryContract.getExchange(
      erc20TokenContract
    );

    this.logUniswapOutput(`Got the exchange address - ${exchangeAddress}`);
    // Uniswap class - Got the exchange address - 0x60a87cC7Fca7E53867facB79DA73181B1bB4238B

    return exchangeAddress;
  }

  /**
   * Get the token contract for the erc20 token
   * @param erc20TokenContract The erc20 token contract
   */
  private getTokenContract(erc20TokenContract: string): TokenContractContext {
    // Has to cast to unknown as we have made some typings changes to the
    // contract interfaces which conflicts with `ethers` typings.
    // This all work great but the compiler gets confused.
    // Casting to unknown first then the `TokenContractContext` solves this.
    return (new ethers.Contract(
      erc20TokenContract,
      AbiExamples.tokenAbi,
      customHttpProvider
    ) as unknown) as TokenContractContext;
  }

  /**
   * Get the exchange contract from the exchange address
   * @param exchangeAddress The exchange address
   */
  private getExchangeContractForTokenByExchangeAddress(
    exchangeAddress: string
  ): UniswapExchangeContractContext {
    // Has to cast to unknown as we have made some typings changes to the
    // contract interfaces which conflicts with `ethers` typings.
    // This all work great but the compiler gets confused.
    // Casting to unknown first then the `UniswapExchangeContractContext` solves this.
    return (new ethers.Contract(
      exchangeAddress,
      AbiExamples.uniswapExchangeAbi,
      customHttpProvider
    ) as unknown) as UniswapExchangeContractContext;
  }

  /**
   * Build the uniswap factory contract instance
   */
  private buildUniswapFactoryContract(): UniswapFactoryContractContext {
    // Has to cast to unknown as we have made some typings changes to the
    // contract interfaces which conflicts with `ethers` typings.
    // This all work great but the compiler gets confused.
    // Casting to unknown first then the `UniswapFactoryContractContext` solves this.
    return (new ethers.Contract(
      AbiExamples.uniswapFactoryAddress,
      AbiExamples.uniswapFactoryAbi,
      customHttpProvider
    ) as unknown) as UniswapFactoryContractContext;
  }

  /**
   * So you can tell what is the internal log or the example log when you run it
   * @param message The message
   */
  private logUniswapOutput(message: string): void {
    console.log(`Uniswap class - ${message}`);
  }
}

const example = async () => {
  const ethAmount = ethers.utils.parseEther('0.01'); // 0.01 eth;

  const uniswap = new UniswapStronglyTypedExample();

  // get the max tokens
  const maxTokens = await uniswap.maxAmountOfTokensToBuy();
  console.log(maxTokens.toString());
  // 18681618.58283796

  const getTokenTrade = await uniswap.getTokenTradeAmountEthToErc20(ethAmount);
  console.log(getTokenTrade.toString());
  // 973.425797813

  /**
   * PLEASE NOTE:
   *
   * The below code is an example in how you would sign the transaction with the typings.
   * If you run this script just using `node ./dist/web3/uniswap-example/uniswap-contract-strongly-typed-example.js
   * it will not work and throw errors in the trade calls as you don't have a wallet connected to it aka no private key :)
   *
   */

  const transactionHash = await uniswap.trade(ethAmount, new BigNumber('900'));

  console.log(transactionHash);
  // 0x972c2155137efecb126dc5f4f72fb451753eab8f5fce45aad73e00861ae27fe1
};

example();

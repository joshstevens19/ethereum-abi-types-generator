import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
import { AbiExamples } from '../../abi-examples';
import { ContractContext as TokenContractContext } from './generated-typings/token-contract';
import { ContractContext as UniswapExchangeContractContext } from './generated-typings/uniswap-exchange-contract';
import { ContractContext as UniswapFactoryContractContext } from './generated-typings/uniswap-factory-contract';

const mockEthereumAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const web3 = new Web3(
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

    const price = await exchangeContract.methods
      .getEthToTokenInputPrice(web3.utils.toWei(ethAmount.toFixed(), 'ether'))
      .call();

    this.logUniswapOutput(`Got the eth to token input price - ${price}`);
    // Uniswap class - Got the eth to token input price - 102465873454

    const tokenAmount = new BigNumber(price).shiftedBy(
      AbiExamples.funDecimalPlaces * -1
    );

    this.logUniswapOutput(`Got the fun token amount - ${tokenAmount}`);
    // Uniswap class - Got the fun token amount - 1024.65873454

    // add some slippage
    const tokenAmountWithSlippage = tokenAmount.minus(
      tokenAmount.times(this.SLIPPAGE).toFixed()
    );

    this.logUniswapOutput(
      `Fun token amount with the slippage taken off - ${tokenAmountWithSlippage.toFixed()}`
    );
    // Uniswap class - Fun token amount with the slippage taken off - 973.425797813

    return tokenAmountWithSlippage;
  }

  /**
   * Get max amount of fun tokens you can buy
   */
  public async maxAmountOfTokensToBuy() {
    const exchangeAddress = await this.getExchangeAddress(
      AbiExamples.funContractAddress
    );

    const tokenContract = this.getTokenContract(AbiExamples.funContractAddress);

    const tokenReserveRaw = await tokenContract.methods
      .balanceOf(exchangeAddress)
      .call();
    ``;
    this.logUniswapOutput(
      `Got the token reserve raw value - ${tokenReserveRaw}`
    );
    // Uniswap class - Got the token reserve raw value - 1868161858283796

    const tokenReserve = new BigNumber(tokenReserveRaw).shiftedBy(
      AbiExamples.funDecimalPlaces * -1
    );

    this.logUniswapOutput(
      `Token reserve raw value formatted to fun decimal places - ${tokenReserve}`
    );
    // Uniswap class - Token reserve raw value formatted to fun decimal places - 18681618.58283796

    return tokenReserve;
  }

  /**
   * Make the trade encoding the data and sending the transaction
   * @param ethAmount The eth amount
   * @param minTokens The min tokens
   */
  public async tradeWithBuildingTransactionConfig(
    ethAmount: BigNumber,
    minTokens: BigNumber
  ): Promise<string> {
    const exchangeAddress = await this.getExchangeAddress(
      AbiExamples.funContractAddress
    );

    const exchangeContract = this.getExchangeContractForTokenByExchangeAddress(
      exchangeAddress
    );

    // you can build the data up like this if you want?
    const data = exchangeContract.methods
      .ethToTokenSwapInput(
        web3.utils.toHex(minTokens as any),
        this.generateTradeDeadlineUnixTime()
      )
      .encodeABI();

    this.logUniswapOutput(`Encoded abi and generated data ${data}`);
    // Uniswap class - Encoded abi and generated data 0xf39b5b9b0000000000000000000000000000000000000000000000000000000000000384000000000000000000000000000000000000000000000000000000005eac075c

    // and build up a `TransactionConfig`
    const transactionConfig: TransactionConfig = {
      from: mockEthereumAddress,
      to: exchangeAddress,
      data,
      value: web3.utils.toWei(ethAmount.toFixed(), 'ether'),
      gas: web3.utils.numberToHex(21912),
    };

    this.logUniswapOutput(
      `Transaction config built up ${JSON.stringify(transactionConfig)}`
    );
    // Uniswap class - Transaction config built up {"from":"0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b","to":"0x60a87cC7Fca7E53867facB79DA73181B1bB4238B","data":"0xf39b5b9b0000000000000000000000000000000000000000000000000000000000000384000000000000000000000000000000000000000000000000000000005eac075c","value":"10000000000000000"}

    // obviously if your using a wallet provider do your standard
    // web3.eth.sendTransaction :)
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionConfig,
      '0x0123456789012345678901234567890123456789012345678901234567890123'
    );

    // and send it through web3...
    // not actually going to send here as we have no private keys
    // but if you were using metamask or other wallet providers it would trigger a signer
    // this is merely an example
    const transactionReceipt = (await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction!
    )) as TransactionReceipt;

    this.logUniswapOutput(
      `Transaction sent ${transactionReceipt.transactionHash}`
    );
    // Uniswap class - Transaction sent 0x972c2155137efecb126dc5f4f72fb451753eab8f5fce45aad73e00861ae27fe1

    return transactionReceipt.transactionHash;
  }

  /**
   * Make the trade using the promi events way
   * @param ethAmount The eth amount
   * @param minTokens The min tokens
   */
  public async tradeWithPromiEvents(
    ethAmount: BigNumber,
    minTokens: BigNumber
  ): Promise<string> {
    const exchangeAddress = await this.getExchangeAddress(
      AbiExamples.funContractAddress
    );

    const exchangeContract = this.getExchangeContractForTokenByExchangeAddress(
      exchangeAddress
    );

    // You can send straight away
    // using the promi events to do this
    // again all typings will show for you
    const transactionHash: string = await new Promise((resolve, reject) => {
      exchangeContract.methods
        .ethToTokenSwapInput(
          web3.utils.toHex(minTokens as any),
          this.generateTradeDeadlineUnixTime()
        )
        .send({
          from: mockEthereumAddress,
          value: web3.utils.toWei(ethAmount.toFixed(), 'ether'),
        })
        .once('transactionHash', (hash) => {
          console.log(`Transaction hash - ${hash}`);
          // Uniswap class - Transaction hash 0xcd1067f21622fb55b609c1248011dcb6237dd6c3981a44792d38f016a102e7b1
          resolve(hash);
        })
        .on('error', async (error) => {
          reject(error);
        })
        .catch((error) => {
          reject(error);
        });
    });

    this.logUniswapOutput(`Transaction sent ${transactionHash}`);
    // Uniswap class - Transaction sent 0xcd1067f21622fb55b609c1248011dcb6237dd6c3981a44792d38f016a102e7b1

    return transactionHash;
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
    const exchangeAddress = await this._factoryContract.methods
      .getExchange(erc20TokenContract)
      .call();

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
    // contract interfaces which conflicts with `web3` typings.
    // This all work great but the compiler gets confused.
    // Casting to unknown first then the `TokenContractContext` solves this.
    return (new web3.eth.Contract(
      AbiExamples.tokenAbi,
      erc20TokenContract
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
    // contract interfaces which conflicts with `web3` typings.
    // This all work great but the compiler gets confused.
    // Casting to unknown first then the `UniswapExchangeContractContext` solves this.
    return (new web3.eth.Contract(
      AbiExamples.uniswapExchangeAbi,
      exchangeAddress
    ) as unknown) as UniswapExchangeContractContext;
  }

  /**
   * Build the uniswap factory contract instance
   */
  private buildUniswapFactoryContract(): UniswapFactoryContractContext {
    // Has to cast to unknown as we have made some typings changes to the
    // contract interfaces which conflicts with `web3` typings.
    // This all work great but the compiler gets confused.
    // Casting to unknown first then the `UniswapFactoryContractContext` solves this.
    return (new web3.eth.Contract(
      AbiExamples.uniswapFactoryAbi,
      AbiExamples.uniswapFactoryAddress
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
  const ethAmount = new BigNumber('0.01'); // 0.01 eth;

  const uniswap = new UniswapStronglyTypedExample();

  // get the max tokens
  const maxTokens = await uniswap.maxAmountOfTokensToBuy();
  console.log(maxTokens.toFixed());
  // 18681618.58283796

  const getTokenTrade = await uniswap.getTokenTradeAmountEthToErc20(ethAmount);
  console.log(getTokenTrade.toFixed());
  // 973.425797813

  /**
   * PLEASE NOTE:
   *
   * The below code is an example in how you would sign the transaction with the typings.
   * If you run this script just using `node ./dist/web3/uniswap-example/uniswap-contract-strongly-typed-example.js
   * it will not work and throw errors in the trade calls as you don't have a wallet connected to it aka no private key :)
   *
   */

  const tradeWithBuildingTransactionConfig = await uniswap.tradeWithBuildingTransactionConfig(
    ethAmount,
    new BigNumber('900')
  );

  console.log(tradeWithBuildingTransactionConfig);
  // 0x972c2155137efecb126dc5f4f72fb451753eab8f5fce45aad73e00861ae27fe1

  const trade = await uniswap.tradeWithPromiEvents(
    ethAmount,
    new BigNumber('900')
  );

  console.log(trade);
  // 0xcd1067f21622fb55b609c1248011dcb6237dd6c3981a44792d38f016a102e7b1
};

example();

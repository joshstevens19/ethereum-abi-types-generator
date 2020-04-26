import { Contract } from 'ethers';

export type EthersContractContext<TMethods> = Contract & TMethods;

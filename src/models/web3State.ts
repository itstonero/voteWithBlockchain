import Web3 from 'web3';

export class Web3State
{
    account ?: string;
    web3 ?: Web3;
    currentProvider ?: any;
}
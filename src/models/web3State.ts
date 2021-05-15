import Web3 from 'web3';
import { Candidate } from './candidate';

export class Web3State
{
    accounts : Array<string> = [];
    web3 ?: Web3;
    currentProvider ?: any;
    contract ?: any;
    candidates: Array<Candidate> = [];
}
import Web3 from "web3";
import { Web3State } from "../models/web3State";
const DEFAULT_PROVIDER = 'ws://localhost:7545';

const initiatelizeWeb3 = (state: Web3State) : Web3State => 
{
    state.web3 = new Web3(state.currentProvider || DEFAULT_PROVIDER);
    state.currentProvider = state.web3.currentProvider;
    console.log(state);
    return state;
}

const initiatelizeContract = (state: Web3State) : Web3State => 
{
    return state;
}

export { initiatelizeWeb3, initiatelizeContract }
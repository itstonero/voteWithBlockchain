import Web3 from "web3";
import { Web3State } from "../models/web3State";
const contractConfig = require('../config/electionContract.json');


const initiatelizeWeb3 = async (state: Web3State) : Promise<Web3State> => 
{
    state.web3 = new Web3(state.currentProvider || contractConfig.DEFAULT_PROVIDER);
    state.currentProvider = state.web3.currentProvider;
    await initiatelizeContract(state);
    return state;
}

const initiatelizeContract = async (state: Web3State) : Promise<Web3State> => 
{
    if(state.web3)
    {
        state.contract = new state.web3.eth.Contract(contractConfig.ABI, contractConfig.ADDRESS);
        state.accounts = await state.web3.eth.getAccounts();
        let totalCandidates =  (await state.contract.methods.totalCandidates().call());
        if(totalCandidates <= 0)
        {
            return await seedContract(state);
        }
        
    }
    return state;
}

const seedContract = async (state: Web3State) : Promise<Web3State> =>
{
    if(state.contract)
    {
        for(let candidate of contractConfig.CANDIDATES)
        {
            state.contract.methods
                .registerCandidate(candidate.Name, candidate.Bio, candidate.Agenda)
                    .send({ from: state.accounts[0], gas:3000000});
        }
    }
    return state;
}

export { initiatelizeWeb3 }
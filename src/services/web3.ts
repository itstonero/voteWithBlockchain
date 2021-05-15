import Web3 from "web3";
import { Candidate, IVoteCastingResult } from "../models/candidate";
import { IInitializationResult, Web3State } from "../models/web3State";
const contractConfig = require('../config/electionContract.json');

declare const window: any;

const initiatelizeWeb3 = async (state: Web3State) : Promise<IInitializationResult> => 
{
    try {
        
        if(!window.ethereum)
        {
            return { web3: state, message: "Install METAMASK to continue", code: "ERROR" };
        }

        state.web3 = new Web3(window.ethereum);
        state.currentProvider = state.web3.currentProvider;
        await initiatelizeContract(state);

        return { web3: state, message: "Initialized Successfully", code: "SUCCESS" };        
    } catch (error) {
        return { web3: state, message: extraBlockError(error.message), code: "ERROR" };
    }
}

const loadCandidates = async(state: Web3State) : Promise<Web3State> =>
{
    let totalCandidates =  (await state.contract.methods.totalCandidates().call());
    if(totalCandidates <= 0)
    {
        await seedContract(state);
    }else
    {
        for(let i = 0; i < totalCandidates; i++)
        {
            const newCandidate:Candidate = await state.contract.methods.candidates(i).call();
            newCandidate.id = i;
            state.candidates.push(newCandidate);
        }
    }

    return state;
}

const initiatelizeContract = async (state: Web3State) : Promise<Web3State> => 
{
    if(state.web3)
    {
        //state.web3.eth.handleRevert = true;
        state.contract = new state.web3.eth.Contract(contractConfig.ABI, contractConfig.ADDRESS);
        state.accounts = await state.web3.eth.getAccounts();
        // state.accounts.forEach((x:any) => {
        //     state.contract.methods
        //     .authorizeVoter(x)
        //         .send({ from: state.accounts[0], gas:300000})
        // })   
        
    }
    return await loadCandidates(state);
}

const seedContract = async (state: Web3State) : Promise<Web3State> =>
{
    if(state.contract)
    {
        for(let candidate of contractConfig.CANDIDATES)
        {
            state.contract.methods
                .registerCandidate(candidate.Name, candidate.Bio, candidate.Agenda, candidate.photoUrl)
                    .send({ from: state.accounts[0], gas:3000000});
        }
    }
    return state;
}

const castVote = async(candidateId: number, web3: Web3State) : Promise<IVoteCastingResult> =>{
    try {
        const contract = web3.contract;
        await window.ethereum.send('eth_requestAccounts');
        const isSuccess =  await contract.methods.castVote(web3.accounts[0],  candidateId).send({from: web3.accounts[0]});
        if(!isSuccess)
        {
            return { message: "An Error Occurred", code : "ERROR" }; 
        }
        await loadCandidates(web3);
        return { message: "VOTED SUCCESSFULLY", code : "SUCCESS" };
    } catch (error) {
        return { message: extraBlockError(error.message), code : "ERROR" };
    }
}

const extraBlockError = (raw:string) : string => {
    if(raw.indexOf("{") > 0)
    {
        const sT = raw.substring(raw.indexOf("{"));
        let log = JSON.parse(sT.substring(0, sT.length - 1));
        return log.value.data.message;
    }

    return raw.split("/n")[0];
}

//want blind vital beef unique toy jelly select decline release sauce collect
export { initiatelizeWeb3, castVote, loadCandidates }
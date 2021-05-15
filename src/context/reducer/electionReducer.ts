import { IVoteCastingResult } from "../../models/candidate";
import { IInitializationResult, Web3State } from "../../models/web3State";
import { castVote, initiatelizeWeb3 } from "../../services/web3";
import { WEB3_INITIALIZE, WEB_3_ASYC_CAST_VOTE, WEB_3_ASYNC_INITIALIZE, WEB_3_CAST_VOTE } from "../actions/electionActions";

 
export const electionReducer = (state:any, action:any) => {
    console.log(action);
    switch(action.type)
    {
        case WEB_3_ASYNC_INITIALIZE:
            initiatelizeWeb3(new Web3State()).then((payload:IInitializationResult) => {
                action.dispatch({ type: WEB3_INITIALIZE,  payload: {  web3:payload.web3 /*,  flash: {  title: "CONNECTIVITY", message: payload.message,  type: payload.code  }*/ } });
            })
            return state;

        case WEB3_INITIALIZE:
            return { ...state, isLoading: false, ...action.payload };

        case WEB_3_ASYC_CAST_VOTE:
            castVote(action.payload.candidateId, state.web3).then((x:IVoteCastingResult) => {
                action.dispatch({ type: WEB_3_CAST_VOTE, payload: { flash: { title: "VOTING", message: x.message, type: x.code }} })
            })
            return { ...state, isLoading:true };
        
        case WEB_3_CAST_VOTE:
            return {...state, ...action.payload, isLoading: false };

        default:
            return {...state, flash: undefined };
    }
}
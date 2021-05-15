import { Web3State } from "../../models/web3State";
import { initiatelizeWeb3 } from "../../services/web3";
import { WEB3_INITIALIZE, WEB_3_ASYNC_INITIALIZE } from "../actions/electionActions";

 
export const electionReducer = (state:any, action:any) => {
    console.log(action);
    switch(action.type)
    {
        case WEB_3_ASYNC_INITIALIZE:
            initiatelizeWeb3(new Web3State()).then((payload:Web3State) => {
                action.dispatch({type: WEB3_INITIALIZE, payload });
            });
            return state;

        case WEB3_INITIALIZE:
            return { ...state, isLoading: false, web3:action.payload };

        default:
            return state;
    }
}
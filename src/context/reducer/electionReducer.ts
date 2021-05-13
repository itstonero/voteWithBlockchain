import { Web3State } from "../../models/web3State";
import { initiatelizeWeb3 } from "../../services/web3";

 
export const electionReducer = (state:any, action:any) => {
    console.log(action);
    switch(action.type)
    {
        case "INITIALIZE":
            initiatelizeWeb3(new Web3State()).then((x:Web3State) => {
                action.dispatch({type: "LOAD_WEB3", payload: x });
            });
            return state;
            
        case "LOAD_WEB3":
            return { ...state, ...action.payload };

        default:
            return state;
    }
}
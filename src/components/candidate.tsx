import React from 'react';
import { ElectionContext } from "../App";
import { Candidate } from '../models/candidate';
import { IReducer } from "../models/IReducer";
import { Card } from 'antd'

function CandidateComponent({ candidate }:any)
{    
    return (
            <Card hoverable style={{ width: 240, margin: '20px' }} cover={<img alt="example" src={process.env.PUBLIC_URL + candidate.photoUrl} />} >
                <Card.Meta title={candidate.name} description={candidate.agenda} />
            </Card>
    )
}


export function CandidatesPage(){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { state, dispatch}:IReducer = React.useContext(ElectionContext);
    if(!state.web3) return <> </>;

    return state.web3.candidates.map((x:Candidate, key:number) => <CandidateComponent candidate={x} key={key}/>);
}
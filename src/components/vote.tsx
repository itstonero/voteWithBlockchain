import React from 'react';
import { Radio, Button, Space } from 'antd';
import { ElectionContext } from '../App';
import { IReducer } from "../models/IReducer";
import { Candidate } from '../models/candidate';
import { WEB_3_ASYC_CAST_VOTE } from '../context/actions/electionActions';

export function VotingPage(){
    const { state, dispatch }:IReducer = React.useContext(ElectionContext);
    const [ value, changeValue ] = React.useState<number>(-1);
    if(!state.web3) return <> </>;
    return (
    <Space direction="vertical">
      <Radio.Group onChange={(e:any) => changeValue(e.target.value)} value={value}>
          <Space direction="vertical" size="large" split>
            { state.web3.candidates.map((x:Candidate, key:number) => (<Radio value={x.id} key={key}>{ x.name }</Radio>)) }
          </Space>
        </Radio.Group>
        <Button type="primary" block onClick={() => 
            dispatch({type: WEB_3_ASYC_CAST_VOTE, payload: { candidateId: value }, dispatch })
        } > Cast Vote </Button>
    </Space>)
}
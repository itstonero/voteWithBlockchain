import React from 'react';
import './App.css';
import { electionReducer } from './context/reducer/electionReducer';
import { WEB_3_ASYNC_INITIALIZE, WEB_3_CAST_VOTE } from './context/actions/electionActions';
import { Loading } from './components/loader';
import { AppHeader } from './components/header';
import { VoteChart } from './components/chart';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ROUTE_CANDIDATES, ROUTE_STATISTICS, ROUTE_VOTE } from './routes';
import { CandidatesPage } from './components/candidate';
import { VotingPage } from './components/vote';
import SweetAlert from 'react-bootstrap-sweetalert';

export const ElectionContext = React.createContext({});

function App() {
  const [state, dispatch ] = React.useReducer(electionReducer, { isLoading: true });
  React.useEffect(() => dispatch({type: WEB_3_ASYNC_INITIALIZE, dispatch }), []);

  return (
    <ElectionContext.Provider value={{ state, dispatch } }>
      <BrowserRouter>
        <AppHeader />
        { state.flash && <SweetAlert
                            success={state.flash.type === "SUCCESS"} 
                            error={state.flash.type === "ERROR"} 
                            title={state.flash.title} 
                            showConfirm={false}
                            showCancel={true}
                            onConfirm={() => dispatch({type: undefined })}
                            onCancel={() => dispatch({type: undefined })}
                            >
                            { state.flash.message }
                          </SweetAlert>
        }
        { state.isLoading &&  <Loading /> }
          <Switch>
            <Route path={ROUTE_CANDIDATES}>
              <CandidatesPage />
            </Route>
            <Route path={ROUTE_VOTE}>
              <VotingPage />
            </Route>
            <Route path={ROUTE_STATISTICS}>
              { state.web3 &&   <VoteChart  candidates = { state.web3.candidates } /> }
            </Route>
            <Route path="/" >
              <Redirect to={ROUTE_CANDIDATES} />
            </Route>
          </Switch>
    </BrowserRouter>
    </ElectionContext.Provider>
  );
}

export default App;

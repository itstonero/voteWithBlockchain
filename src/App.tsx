import React from 'react';
import './App.css';
import { ElectionContext } from './context/provider/electionContext';
import { electionReducer } from './context/reducer/electionReducer';
import { WEB_3_ASYNC_INITIALIZE } from './context/actions/electionActions';
import { Loading } from './components/loader';
import { AppHeader } from './components/header';
import { VoteChart } from './components/chart';
import { Candidate } from './models/candidate';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ROUTE_CANDIDATES, ROUTE_STATISTICS, ROUTE_VOTE } from './routes';


function App() {
  const [state, dispatch ] = React.useReducer(electionReducer, { isLoading: true, candidates: [] });
  React.useEffect(() => dispatch({type: WEB_3_ASYNC_INITIALIZE, dispatch }), []);

  return (
    <ElectionContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
      <div>
        <AppHeader />
        <Loading loading={state.isLoading} />
        <Switch>
          <Route path={ROUTE_CANDIDATES}>
            <h1>This is the candidates Page</h1>
          </Route>
          <Route path={ROUTE_VOTE}>
            <h1>This is the voting Page</h1>
          </Route>
          <Route path={ROUTE_STATISTICS}>
            <VoteChart  candidates = {[new Candidate("Anthony", "Bio", "Agenda", 800), new Candidate("Victoria", "Bio", "Agenda", 30), new Candidate("Micheal", "Bio", "Agenda", 45)]} />
          </Route>
          <Route path="/" >
            <Redirect to={ROUTE_CANDIDATES} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    </ElectionContext.Provider>
  );
}

export default App;

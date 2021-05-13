import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ElectionContext } from './context/provider/electionContext';
import { electionReducer } from './context/reducer/electionReducer';

       
function App() {
  const [state, dispatch ] = React.useReducer(electionReducer, undefined);
  
  return (
    <ElectionContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={() => console.log(state)}>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>     
          <p onClick={() => dispatch({type: "INITIALIZE", dispatch })}>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>         
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
        </header>
      </div>
    </ElectionContext.Provider>
  );
}

export default App;

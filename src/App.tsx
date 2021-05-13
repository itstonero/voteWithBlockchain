import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { initiatelizeWeb3 } from "./services/web3"
import { Web3State } from './models/web3State';

function App() {
  
  useEffect(() => {
    initiatelizeWeb3(new Web3State()).then(async (webState:Web3State) => {
      console.log(webState);
      console.log(`Total Canditates :: ${await webState.contract?.methods.totalCandidates().call()}`);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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
  );
}

export default App;

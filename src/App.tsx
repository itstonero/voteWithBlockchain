import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ElectionContext } from './context/provider/electionContext';
import { electionReducer } from './context/reducer/electionReducer';
import { WEB_3_ASYNC_INITIALIZE } from './context/actions/electionActions';
import Loader from "react-loader-spinner";
import Modal from "react-modal"
       
function App() {
  const [state, dispatch ] = React.useReducer(electionReducer, { isLoading: true, loadingMessage: "Initializing Smart Contract" });

  React.useEffect(() => dispatch({type: WEB_3_ASYNC_INITIALIZE, dispatch }), []);
  const
   customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  return (
    <ElectionContext.Provider value={{ state, dispatch }}>
      <div className="App">
      <Modal isOpen={state.isLoading} style = {customStyles} ariaHideApp={false}>
            <Loader  type="Puff" color="#00BFFF" height={300} width={300} visible={state.isLoading} />
            <h3>{state.loadingMessage}</h3>
          </Modal>
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
    </ElectionContext.Provider>
  );
}

export default App;

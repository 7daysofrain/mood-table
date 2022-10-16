import logo from './logo.svg';
import './App.css';
import {useEffect, useRef} from "react";
import WSSBridgeClient from "@mood-table/shared/src/wss-bridge/client";
import appState from "@mood-table/shared/src/models/app-state.js";

function App() {
  const wss = useRef();
  useEffect(() => {
    wss.current = new WSSBridgeClient();
    wss.current.addEventListener('stateUpdated', updateState);
  }, []);
  const changeFX = fx => {
    wss.current?.changeFX(fx);
  }
  const updateState = event => {
    console.log(event.data.message);
    appState.updateState(event.data.message);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => changeFX('Blue mood blobs')}>Change to Blue mood blobs</button>
        <button onClick={() => changeFX('Breath')}>Change to Breath</button>
        <p id="output">{appState.currentFX}</p>
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

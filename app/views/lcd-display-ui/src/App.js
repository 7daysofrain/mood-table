import logo from './logo.svg';
import './App.css';
import {useEffect, useRef} from "react";
import WSSBridgeClient from "wss-bridge/client";

function App() {
  const wss = useRef();
  useEffect(() => {
    wss.current = new WSSBridgeClient()
  }, []);
  const changeColor = event => {
    event.preventDefault();
    wss.current?.send("change:color");
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={changeColor}>Change to red</button>
        <p id="output">
          Edit <code>src/App.js</code> and save to reload.
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

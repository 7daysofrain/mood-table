import appState from "../models/app-state.js";
import mobx, {autorun} from "mobx";

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8090 });
let conn;
const store = appState;
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send(JSON.stringify(mobx.toJS(store)));
    conn = ws;
});

function update() {
    console.log(store);
    if(conn){
        conn.send(JSON.stringify(mobx.toJS(store)));
    }
}
autorun((store) => update(store));
export default wss;

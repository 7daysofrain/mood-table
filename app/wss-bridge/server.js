import appState from "../models/app-state.js";
import mobx, {autorun} from "mobx";

import WebSocket from 'ws';
import config from "config";

class WSSBridgeServer extends EventTarget{

    constructor() {
        super();
        const port = config.get('wss-port')
        this.wss = new WebSocket.Server({ port });
        this.wss.on('connection', this.handleConnection);
    }
    handleConnection = ws => {
        console.log('WS bridge connected')
        ws.on('message',this.handleMessage);
        // ws.send(JSON.stringify(mobx.toJS(store)));
        this.connection = ws;
        this.dispatchEvent(new Event('connected'));
        // FIXME sacar de aqui
        autorun((store) => this.sendMessage(JSON.stringify(mobx.toJS(store))));
    }
    handleMessage = message => {
        console.log('received: %s', message);
        this.dispatchEvent(new Event('message', message));
    }
    sendMessage(message) {
        this.connection.send(message);
    }
}
const server = new WSSBridgeServer();

export default server;

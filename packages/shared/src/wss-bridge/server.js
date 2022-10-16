import appState from "../models/app-state.js";
import mobx, {autorun} from "mobx";

import { WebSocketServer } from 'ws';
import config from "config";

class WSSBridgeServer extends EventTarget{

    constructor() {
        super();
        const port = config.get('wss-port')
        this.wss = new WebSocketServer({ port });
        this.wss.on('connection', this.handleConnection);
    }
    handleConnection = ws => {
        console.log('WS bridge connected')
        ws.on('message',this.handleMessage);
        // ws.send(JSON.stringify(mobx.toJS(store)));
        this.connection = ws;
        this.dispatchEvent(new Event('connected'));
        // FIXME sacar de aqui
        autorun(() => {
            const plain = mobx.toJS(appState);
            return this.sendMessage('state', plain);
        });
    }
    handleMessage = message => {
        const payload = JSON.parse(message.toString());
        console.log('received: %s', payload);
        switch(payload.type) {
            case 'changeFX':
                const e = new Event('changeFX');
                e.data = payload;
                this.dispatchEvent(e);
        }
    }
    sendMessage(type, message) {
        const payload = {
            type,
            message
        };

        this.connection.send(JSON.stringify(payload));
    }
}
const server = new WSSBridgeServer();

export default server;

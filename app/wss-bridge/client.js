import config from "config";

export default class WSSBridgeClient extends EventTarget{
    constructor() {
        super();
        const port = config.get('wss-port')
        const wsUri = `ws://localhost:${port}/`;
        this.websocket = new WebSocket(wsUri);
        this.websocket.onopen = this.onOpen;
        this.websocket.onclose = this.onClose;
        this.websocket.onmessage = this.onMessage;
        this.websocket.onerror = this.onError;
    }
    onOpen = (evt) => {
        console.log('connected', evt);
        //doSend("WebSocket rocks");
    }
    onClose = (evt) => {
        console.log('close', evt);
        //doSend("WebSocket rocks");
    }
    onMessage = (evt) => {
        console.log('message', evt);
        //doSend("WebSocket rocks");
    }
    onError = (evt) => {
        console.log('error', evt);
        //doSend("WebSocket rocks");
    }
    send(message) {
        console.log('sending', message);
        this.websocket.send(message);
    }
}


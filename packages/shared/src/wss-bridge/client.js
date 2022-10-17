
export default class WSSBridgeClient extends EventTarget{
    constructor() {
        super();
        this.connect();
    }
    connect() {
        clearInterval(this.intervalId);
        const port = 8090;
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
        this.intervalId = setInterval(() => this.connect(), 100);
        //doSend("WebSocket rocks");
    }
    onMessage = (evt) => {
        console.log('message', evt);
        const data = JSON.parse(evt.data);
        switch (data.type) {
            case "state":
                console.log("new state received");
                const e = new Event('stateUpdated');
                e.data = data;
                this.dispatchEvent(e);
        }
    }
    onError = (evt) => {
        console.log('error', evt);
        //doSend("WebSocket rocks");
    }
    send(type, message) {
        console.log('sending', type, message);
        const payload = {
            type,
            message
        }
        this.websocket.send(JSON.stringify(payload));
    }
    changeFX(name) {
        this.send('changeFX', name);
    }
}


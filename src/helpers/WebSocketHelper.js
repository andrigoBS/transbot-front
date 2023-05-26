let webSocket = null;

const createConnection = (onReceive, onError, onConnect) => {
    if(!webSocket) {
        webSocket = new WebSocket(import.meta.env.REACT_APP_SERVER_URL+'/talk');
    }

    webSocket.onmessage = (ev) => onReceive(JSON.parse(ev.data));
    webSocket.onerror = (ev) => onError();
    webSocket.onopen = (ev) => onConnect();

    return webSocket;
};

const send = (data) => {
    webSocket.send(JSON.stringify(data));
};

const close = () => {
    webSocket.close();
    webSocket = null;
};

export default { close, createConnection, send };


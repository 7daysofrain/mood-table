import HyperionView from "./views/HyperionView.js";
//import f1Navigator from "./views/f1/f1Navigator.js";
import DancingPIView from "./views/DancingPIView.js";
import createServer from "./http/index.js";
import wss from "./wss-bridge/server.js";

//f1Navigator.navigate('home');
const httpServer = createServer();
const sockets = wss;
const hyperionView = new HyperionView();
const dancingPiView = new DancingPIView();

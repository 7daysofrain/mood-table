import HyperionView from "./views/HyperionView.js";
import f1Navigator from "./views/f1/f1Navigator.js";
import DancingPIView from "./views/DancingPIView.js";
import createServer from "./http/index.js";

f1Navigator.navigate('home');
const httpServer = createServer();;
const hyperionView = new HyperionView();
const dancingPiView = new DancingPIView();

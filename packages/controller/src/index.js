import HyperionView from "./views/HyperionView.js";
//import f1Navigator from "./views/f1/f1Navigator.js";
import DancingPIView from "./views/DancingPIView.js";
import createServer from "./http/index.js";
import wss from "@mood-table/shared/src/wss-bridge/server.js";
import appState from "@mood-table/shared/src/models/app-state.js";
import {PythonShell} from "python-shell";


//f1Navigator.navigate('home');
const httpServer = createServer();
const sockets = wss;
const hyperionView = new HyperionView();
const dancingPiView = new DancingPIView();

sockets.addEventListener('changeFX', ev => {
    appState.setFX(ev.data.message);
})
sockets.addEventListener('connected', ev => {
    console.log('Running python bridge')
    runPython('python/main.py');
})
/**
 * Run the python main shell
 */
let pyShell
const pythonDefaults = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: process.cwd(),
};
function runPython(file, args) {
    const options = args ? {...pythonDefaults, args} : pythonDefaults;
    if(pyShell) {
        pyShell.kill();
    }
    pyShell = PythonShell.run(file, options, function (err, results) {
        //On 'results' we get list of strings of all print done in your py scripts sequentially.
        if (err) throw err;
        if(results){
            console.log('results: ');
            for (let i of results) {
                console.log(i, "---->", typeof i)
            }
        }
    });
}


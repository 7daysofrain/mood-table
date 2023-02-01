import HyperionView from "./views/HyperionView.js";
//import f1Navigator from "./views/f1/f1Navigator.js";
//import DancingPIView from "./views/DancingPIView.js";
//import createServer from "./http/index.js";
import appState from "@mood-table/shared/src/models/app-state.js";



//f1Navigator.navigate('home');
//const httpServer = createServer();
const hyperionView = new HyperionView();
//const dancingPiView = new DancingPIView();



// import wss from "@mood-table/shared/src/wss-bridge/server.js";
// const sockets = wss;
// sockets.addEventListener('changeFX', ev => {
//     appState.setFX(ev.data.message);
// })
/**
 * Run the python main shell
 * Disabled now
 */
import {PythonShell} from "python-shell";
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
    console.log("Running Python controller")
    pyShell = new PythonShell(file, options);

    pyShell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log("Python controller: " + message);
    });
    // pyShell = PythonShell.run(file, options, function (err, results) {
    //     //On 'results' we get list of strings of all print done in your py scripts sequentially.
    //     if (err) throw err;
    //     if(results){
    //         console.log('Python Controller3: ');
    //         for (let i of results) {
    //             console.log(i, "---->", typeof i)
    //         }
    //     }
    // });
}
// setTimeout(() => runPython('python/main.py'), 4000);

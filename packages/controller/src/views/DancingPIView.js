import Hyperion from "hyperion-client";
import {autorun} from "mobx";
import config from 'config';
import appState from "@mood-table/shared/src/models/app-state.js";
import throttle from "@mood-table/shared/src/utils/throttle.js";
import {PythonShell} from "python-shell";

export default class DancingPIView {
    constructor() {
        this.pythonDefaults = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: config.get('dancingPiPath') ? config.get('dancingPiPath') : process.cwd(),
        };

        this.store = appState;
        autorun((store) => this.update(this.store));
    }
    runPython(file, args) {
        const options = args ? {...this.pythonDefaults, args} : this.pythonDefaults;
        if(this.shell) {
            this.shell.kill();
        }
        this.shell = PythonShell.run(file, options, function (err, results) {
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
    update() {
        if(this.store.currentViz) {
            console.log(`current Viz: ${this.store.currentViz}`);
            this.runPython(config.get('dancingPiVizScript'),[this.store.currentViz])
        }
        else{
            console.log('No Viz selected');
            this.runPython(config.get('dancingPiOffScript'))
        }
        return true;
    }
}

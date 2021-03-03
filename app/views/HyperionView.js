import Hyperion from "hyperion-client";
import {autorun} from "mobx";
import config from 'config';
import appState from "../models/app-state.js";
import throttle from "../utils/throttle.js";

export default class HyperionView {
    constructor() {
        this.hyperion = new Hyperion( config.get('hyperion'), 19444 );
        this.hyperion.on('connect', () => {
            console.log('connected to hyperion');
            // hyperion.sendMessage({
            //     "command":"serverinfo",
            //     "tan":1
            // }, (e,e2) => console.log(JSON.stringify(e2)));
        });
        this.hyperion.on('error', (err) => {
            console.error('oops...', err);
        });

        this.store = appState;
        autorun((store) => this.update(this.store));
    }
    update() {
        if(this.store.currentFX) {
            console.log(`current FX: ${this.store.currentFX.name}: ${JSON.stringify(this.store.currentFXArgs)}`);
            this.hyperion.setEffect(this.store.currentFX.name, this.store.currentFXArgs);
        }
        else{
            console.log('No FX selected');
            this.hyperion.clearall();
        }
        return true;
    }
}

import traktorF1 from 'node-traktor-f1/lib/traktor_f1.js';
import {autorun} from "mobx";
import appState from "../../models/app-state.js";

const f1 = new traktorF1.TraktorF1();

export default class F1View {
    listeners = [];
    _visible = false;
    get visible() {
        return this._visible;
    }
    constructor() {
        this.f1 = f1;
        this.store = appState;
        this._layoutDefaults();
        this.disposeMobx = autorun(() => this._update());
    }
    attachListener(name, listener) {
        this.f1.on(name, listener);
        this.listeners.push({name, listener});
    }
    show() {
        this._visible = true;
        for (const [key, value] of Object.entries(this.f1.leds)) {
            this.f1.setLED(key, 0);
        }
        for (const [key, value] of Object.entries(this.f1.rgb_leds)) {
            this.f1.setRGB(key, 0, 0, 0);
        }
        this._update();
    }
    hide() {
        this._visible = false;
        this.listeners.forEach(l => this.f1.off(l.name, l.listener));
    }
    dispose() {
        this.hide();
        this.disposeMobx();
    }
    _layoutDefaults() {
        this.f1.setLED('sync',1);
        this.f1.on('sync:pressed',() => appState.clearFX())
    }
    clearLayout() {
        for (const [key, value] of Object.entries(this.f1.buttons)) {
            try {
                if (key.startsWith('p')) {
                    this.f1.setRGB(key, 0, 0, 0);
                } else {
                    this.f1.setLED(key, 0);
                }
            }
            catch(e) {
                //console.log(`${key} button not cleared`);
            }
        }
    }
    _update() {
        console.log('update inner')
        //if(!this._visible) return;
        this.clearLayout();
        this._layoutDefaults();
        if(this.update){
            this.update();
        }
    }
}

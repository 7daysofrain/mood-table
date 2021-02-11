import {makeAutoObservable, observable, computed, action} from "mobx";
import config from 'config';
import FX from "./fx.js";

class AppState {
    page = 1
    fxs = {}
    _currentFX = null;
    get currentFX() {
        return this._currentFX;
    }

    constructor() {
        makeAutoObservable(this);
        this.loadFX();
    }
    loadFX() {
        const effectMap = config.get('effects');
        for (const [key, value] of Object.entries(effectMap)) {
            this.fxs[value.name] = new FX(value.name, value.mainColor, value.config);
        }
    }
    updatePage(dir){
        this.page += Number(dir);
    }
    setFX(name) {
        this._currentFX = this.fxs[name];
    }
    clearFX() {
        this._currentFX = null;
    }
}

const appState = new AppState();

export default appState;

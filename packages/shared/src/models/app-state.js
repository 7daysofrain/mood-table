import {makeAutoObservable} from "mobx";
import { effects } from '../config/effects.js'
import FX from "./fx.js";

function configToArg(args, configItem){
    args[configItem.name] = configItem.defaultValue;
    return args;
}

class AppState {
    page = 1
    fxs = {}
    _currentFX = null;
    _currentViz = null;
    _currentFXArgs = {}
    get currentFX() {
        return this._currentFX;
    }
    get currentViz() {
        return this._currentViz;
    }
    get currentFXArgs() {
        return this._currentFXArgs;
    }
    constructor() {
        makeAutoObservable(this);
        this.loadFX();
    }
    loadFX() {
        for (const [key, value] of Object.entries(effects)) {
            this.fxs[value.name] = new FX(value.name, value.mainColor, value.config);
        }
    }
    updatePage(dir){
        this.page += Number(dir);
    }
    setFX(name) {
        this._currentFX = this.fxs[name];
        this._currentFXArgs = this._currentFX.config.reduce(configToArg,{})
    }
    setViz(name) {
        this._currentViz = name;
    }
    updateFXArg(argname, value) {
        //console.log("update", argname, value)
        this._currentFXArgs = {...this.currentFXArgs, [argname]: value};
    }
    clearFX() {
        this._currentFX = null;
    }
    updateState(newState) {
        this.page = newState.page;
        this.fxs = newState.fxs;
        this._currentFX = newState._currentFX;
        this._currentFXArgs = newState._currentFXArgs;
        this._currentViz = newState._currentViz;
    }
}

const appState = new AppState();

export default appState;

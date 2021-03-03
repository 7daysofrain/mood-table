import {makeAutoObservable} from "mobx";
import config from 'config';
import FX from "./fx.js";

function configToArg(args, configItem){
    args[configItem.name] = configItem.defaultValue;
    return args;
}

class AppState {
    page = 1
    fxs = {}
    _currentFX = null;
    _currentFXArgs = {}
    get currentFX() {
        return this._currentFX;
    }
    get currentFXArgs() {
        return this._currentFXArgs;
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
        this._currentFXArgs = this._currentFX.config.reduce(configToArg,{})
    }
    updateFXArg(argname, value) {
        //console.log("update", argname, value)
        this._currentFXArgs = {...this.currentFXArgs, [argname]: value};
    }
    clearFX() {
        this._currentFX = null;
    }
}

const appState = new AppState();

export default appState;

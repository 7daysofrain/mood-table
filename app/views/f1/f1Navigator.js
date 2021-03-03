import F1HomeView from "./F1HomeView.js";
import F1FXConfig from "./F1FXConfig.js";

class F1Navigator{
    _currentScreen = null;
    history = [];
    navigate(name) {
        const Screen = Screens[name];
        if(this._currentScreen !== null) {
            this._currentScreen.hide();
        }
        this._currentScreen = new Screen();
        this._currentScreen.show();
        this.history.push(this._currentScreen);
        console.log(`navigating ${name} screen. history length: ${this.history.length}`);
    }
    back() {
        this.history.pop().dispose();
        this._currentScreen = this.history[this.history.length - 1];
        console.log(`back. history length: ${this.history.length}`);
        this._currentScreen.show();
    }
}
const f1Navigator = new F1Navigator();
export default f1Navigator;

export const Screens = {
    home : F1HomeView,
    'fx-config': F1FXConfig
}

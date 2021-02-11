import F1View from "./F1View.js";
import lcdName from "../../utils/lcdName.js";
import f1Navigator from "../../f1Navigator.js";

export default class F1HomeView extends F1View{
    constructor() {
        super();
        this.key = 'home'
    }
    update(store) {
        const { currentFX } = this.store;

        // LCD
        if(currentFX) {
            this.f1.setLCDString(lcdName(currentFX.name))
        }
        else {
            this.f1.setLCDString('Fx')
        }

        // Main Buttons
        let index = 1;
        for (const [key, value] of Object.entries(this.store.fxs)) {
            this.attachListener(`p${index}:pressed`, () => this.store.setFX(value.name));
            this.f1.setRGB('p' + index,...value.color);
            index++;
        }

        // Navigation
        this.f1.setLED('quant',currentFX ? 1 : 0);
        if(currentFX) {
            this.attachListener('quant:pressed', () => f1Navigator.navigate('fx-config'))
        }
    }
    // Handlers
    dispose() {
        super.dispose();
    }
    toString() {
        return this.key + ' screen';
    }
}

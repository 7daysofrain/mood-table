import F1View from "./F1View.js";
import lcdName from "../../libs/f1/utils/lcdName.js";
import f1Navigator from "./f1Navigator.js";
import blinkF1RGBButton from "../../libs/f1/utils/blinkf1RGBbutton.js";
import blinkF1Button from "../../libs/f1/utils/blinkf1button.js";

export default class F1HomeView extends F1View{
    constructor() {
        super();
        this.key = 'home'
    }
    show() {
        super.show();
        const { currentFX, currentViz } = this.store;
        // Main Buttons
        let index = 1;
        for (const [key, value] of Object.entries(this.store.fxs)) {
            this.attachListener(`p${index}:pressed`, () => this.store.setFX(value.name));
            this.f1.setRGB('p' + index,...value.color);
            index++;
        }

        // Navigation
        this.f1.setLED('quant',currentFX ? 1 : 0);
            this.attachListener('quant:pressed', () => {
                if(this.store.currentFX) {
                    f1Navigator.navigate('fx-config')
                }
            })
        // DancingPi
        const switchViz = viz => {
            const { currentViz } = this.store;
            if(currentViz === viz){
                this.store.setViz('');
            }
            else{
                this.store.setViz(viz);
            }
        }
        this.attachListener('reverse:pressed', () => switchViz('scroll'));
        this.attachListener('type:pressed', () => switchViz('energy'));
        this.attachListener('size:pressed', () => switchViz('spectrum'));
    }
    hide(){
        super.hide();
        this.selectedBlinkStop();
    }
    update() {
        const { currentFX, currentViz } = this.store;

        // LCD
        if(this.selectedBlinkStop){
            this.selectedBlinkStop();
        }
        if(this.selectedVizBlinkStop){
            this.selectedVizBlinkStop();
        }
        if(currentFX) {
            this.f1.setLCDString(lcdName(currentFX.name))
        }
        else {
            this.f1.setLCDString('Fx')
        }

        let index = 1;
        for (const [key, value] of Object.entries(this.store.fxs)) {
            this.f1.setRGB('p' + index,...value.color);
            if(currentFX && value.name === currentFX.name){
                this.selectedBlinkStop = blinkF1RGBButton(this.f1, 'p' + (index), currentFX.color);
            }
            index++;
        }

        // Dancing PY
        this.f1.setLED(`reverse`, 1);
        this.f1.setLED(`type`, 1);
        this.f1.setLED(`size`, 1);

        if(currentViz === 'scroll') {
            this.selectedVizBlinkStop = blinkF1Button(this.f1, 'reverse', 200);
        } else if(currentViz === 'energy') {
            this.selectedVizBlinkStop = blinkF1Button(this.f1, 'type', 200);
        } else if(currentViz === 'spectrum') {
            this.selectedVizBlinkStop = blinkF1Button(this.f1, 'size', 200);
        }

        // Navigation
        this.f1.setLED('quant',currentFX ? 1 : 0);
    }
    // Handlers
    dispose() {
        super.dispose();
    }
    toString() {
        return this.key + ' screen';
    }
}

import F1View from "./F1View.js";
import lcdName from "../../utils/lcdName.js";
import f1Navigator from "./f1Navigator.js";
import blinkF1RGBButton from "../../utils/blinkf1RGBbutton.js";
import {PythonShell} from "python-shell";

export default class F1HomeView extends F1View{
    constructor() {
        super();
        this.key = 'home'
    }
    show() {
        super.show();
        const { currentFX } = this.store;
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
    }
    hide(){
        super.hide();
        this.selectedBlinkStop();
    }
    update() {
        const { currentFX } = this.store;

        // LCD
        if(this.selectedBlinkStop){
            this.selectedBlinkStop();
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
        this.attachListener('shift:pressed', this.scrollFX);
        this.f1.setLED(`shift`, 1);

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
    scrollFX = () => {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: process.cwd(),//Path to your script
            args: [JSON.stringify({"name": ["xyz", "abc"], "age": ["28","26"]})]//Approach to send JSON as when I tried 'json' in mode I was getting error.
        };
        console.log(`Current directory: ${process.cwd()}`);
        PythonShell.run('app/test.py', options, function (err, results) {
            //On 'results' we get list of strings of all print done in your py scripts sequentially.
            // if (err) throw err;
            // console.log('results: ');
            // for (let i of results) {
            //     console.log(i, "---->", typeof i)
            // }
        });
    }
}

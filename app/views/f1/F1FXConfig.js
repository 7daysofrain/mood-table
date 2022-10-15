import F1View from "./F1View.js";
import blinkF1Button from "../../libs/f1/utils/blinkf1button.js";
import f1Navigator from "./f1Navigator.js";
import allLedsRgb from "../../libs/f1/utils/allLedsRgb.js";
import chroma from 'chroma-js'
import debounce from "../../utils/debounce.js";
import clamp from "../../utils/clamp.js";
import {PythonShell} from 'python-shell';

export default class F1FXConfig extends F1View{
    FX_REFRESH_DEBOUNCE = 250;
    constructor() {
        super();
        this.goBack = () => f1Navigator.back();
        this.updateFXArgs = debounce(this.store.updateFXArg.bind(this.store), this.FX_REFRESH_DEBOUNCE)
    }
    show() {
        super.show();
        const { currentFX } = this.store;
        // Setup colors
        const colorControls = currentFX.config.filter(x => x.type === 'color');
        colorControls.forEach((conf, index) => {
            allLedsRgb(this.f1, conf.defaultValue, [index+1]);
            this.attachListener(`s${index + 1}:changed`, ({ value }) => {
                const col = chroma.hsl(360 * value, 1, 0.5);
                allLedsRgb(this.f1, col.rgb(), [index+1]);
                this.updateFXArgs(conf.name, col.rgb());
            })
        })
        // Setup ints & floats
        const intControls = currentFX.config.filter(x => x.type === 'int' || x.type === 'fraction' || x.type === 'float');
        if(intControls.length > 0) {
            // First control
            if(intControls[0].type === 'int' && intControls[0].limits[1] - intControls[0].limits[0] <= 20){
                const firstControl = intControls.shift();
                this.attachListener('stepper:step', ({direction}) => {
                    const {currentFXArgs} = this.store;
                    this.updateFXArgs(
                        firstControl.name,
                        clamp(
                            currentFXArgs[firstControl.name] + direction,
                            firstControl.limits[0],
                            firstControl.limits[1]
                        )
                    );
                    this.f1.setLCDString(currentFXArgs[firstControl.name].toString())
                });
            }
            // Rest of controls
            intControls.forEach((conf, index) => {
                const button = `k${index+1}:changed`;
                this.attachListener(button, ({value}) => {
                    if(conf.type === 'int' || conf.type === 'float'){
                        let v = ((conf.limits[1] - conf.limits[0]) * value) + conf.limits[0];
                        if(conf.type === 'int'){
                            v = Math.round(v);
                        }
                        this.updateFXArgs(conf.name, v);
                    } else if(conf.type === 'fraction'){
                        this.updateFXArgs(conf.name, value);
                    }
                });
                this.f1.setLED(`l${index+1}_l`, 1);
                this.f1.setLED(`l${index+1}_r`, 1);
            })
        }

        // Navigation
        this.attachListener('quant:pressed', this.goBack);
    }
    update() {
        const { currentFX } = this.store;
        if(this.qblink) {
            this.qblink();
        }
        this.qblink = blinkF1Button(this.f1, 'quant');
    }
    dispose() {
        super.dispose();
        this.qblink();
    }
}

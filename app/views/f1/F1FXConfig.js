import F1View from "./F1View.js";
import blinkF1Button from "../../utils/blinkf1button.js";
import f1Navigator from "../../f1Navigator.js";

export default class F1FXConfig extends F1View{
    constructor() {
        super();
        this.goBack = () => f1Navigator.back();
    }
    update() {
        if(this.qblink){
            this.qblink();
        }
        this.qblink = blinkF1Button(this.f1, 'quant');
        if(this.goBack)
            this.attachListener('quant:pressed', this.goBack);
    }
    dispose() {
        super.dispose();
        this.qblink();
    }
}

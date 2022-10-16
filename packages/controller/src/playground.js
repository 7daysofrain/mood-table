const Hyperion = require('hyperion-client');
const traktorF1 = require('./libs/f1/traktor_f1.js');
const config = require('config');

const f1 = new traktorF1.TraktorF1();
f1.setLED('capture',1);
f1.setLED('sync',255);

const effectMap = config.get('effects');

let index = 1;
for (const [key, value] of Object.entries(effectMap)) {
    console.log(`${key}: ${value}`);
    f1.on(`${index}:pressed`,() => hyperion.setEffect(value.name, value.args));
    f1.setRGB(index,...value.ledColor);
    index++;
}

const hyperion = new Hyperion( config.get('hyperion'), 19444 );
hyperion.on('connect', function(){
    console.log('connected');
    hyperion.sendMessage({
        "command":"serverinfo",
        "tan":1
    }, (e,e2) => console.log(JSON.stringify(e2)));
});
hyperion.on('error', function(err){
    console.error('oops...', err);
});


let strobeInterval;
let strobeState = false;
f1.on('p3:pressed',startStrobe);
f1.on('p3:released',stopStrobe);
f1.setRGB('p3', ...[255,0,0])
function startStrobe(){
    strobeInterval = setInterval(strobe,300);
}
function stopStrobe(){
    clearInterval(strobeInterval);
}
function strobe(){
    strobeState = !strobeState;
    if(strobeState){
        hyperion.setColor([255,0,0]);
        f1.setRGB('p3', ...[255,0,0]);
    }
    else{
        hyperion.setColor([0,0,0]);
        f1.setRGB('p3', ...[0,0,0]);
    }
}
f1.on('sync:pressed',() => hyperion.clearall())

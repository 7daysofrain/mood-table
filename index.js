const Hyperion = require('hyperion-client');
const traktorF1 = require('./lib/traktor_f1');
const config = require('config');

const f1 = new traktorF1.TraktorF1();
f1.setLED('capture',1);
f1.setLED('sync',255);

const effectMap = config.get('effectMap');

for (const [key, value] of Object.entries(effectMap)) {
    console.log(`${key}: ${value}`);
    f1.on(`${key}:pressed`,() => hyperion.setEffect(value.name));
    f1.setRGB(key,...value.ledColor);
}

const hyperion = new Hyperion( config.get('hyperion'), 19444 );
hyperion.on('connect', function(){
    console.log('connected');
});
hyperion.on('error', function(err){
    console.error('oops...', err);
});

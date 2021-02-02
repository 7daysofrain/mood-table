const Hyperion = require('hyperion-client');
const traktorF1 = require('./lib/traktor_f1');

const f1 = new traktorF1.TraktorF1();
f1.setLED('capture',1);
f1.setLED('sync',255);
f1.on('p1:pressed',() => hyperion.setEffect('Rainbow swirl'));
f1.on('p2:pressed',() => hyperion.setEffect('Warm mood blobs'));
f1.setRGB('p1',255,0,0);
f1.setRGB('p2',255,255,0);

const hyperion = new Hyperion( '192.168.1.158', 19444 );
hyperion.on('connect', function(){
    console.log('connected');

});
hyperion.on('error', function(err){
    console.error('oops...', err);
});

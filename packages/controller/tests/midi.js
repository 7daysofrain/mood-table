const midi = require('midi');

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
console.log(input.getPortCount());

// Get the name of a specified input port.
console.log(input.getPortName(0));

// Configure a callback.
input.on('message', (deltaTime, message) => {
    // The message is an array of numbers corresponding to the MIDI bytes:
    //   [status, data1, data2]
    // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
    // information interpreting the messages.
    console.log(`m: ${message} d: ${deltaTime}`);
});

// Open the first available input port.
input.openPort(0);

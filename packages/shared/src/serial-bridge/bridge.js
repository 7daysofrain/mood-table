import { SerialPort, ReadlineParser } from 'serialport'
import config from "config";


class SerialBridge extends EventTarget {
    constructor(){
        super();
        const path = config.get('serial-path');
        const baudRate = config.get('serial-baud-rate');
        this.port = new SerialPort({
            path,
            baudRate,

        }, function (err) {
            if (err) {
                return console.log('Serial Port Error: ', err.message)
            }
        }))
        const parser = new ReadlineParser()
        this.port.pipe(parser)
        parser.on('data', console.log)
    }
}

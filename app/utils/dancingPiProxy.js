import {PythonShell} from "python-shell";
import config from 'config';

export const dancingPiProxy = {
    scroll() {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: config.get('dancingPiPath') ? config.get('dancingPiPath') : process.cwd(),
            args: ["scroll"]
        };
        PythonShell.run(config.get('dancingPiScript'), options, function (err, results) {
            //On 'results' we get list of strings of all print done in your py scripts sequentially.
            if (err) throw err;
            console.log('results: ');
            for (let i of results) {
                console.log(i, "---->", typeof i)
            }
        });
    }
}

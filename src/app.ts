import { FileTokenEvent } from './events/FileTokenEvent';

(() => {

    console.log(`Dispara serviço\n`)

    new FileTokenEvent({
        name: `./src/malac.txt`,
        totalBytes: 4
    }).emit(`task`)

})()



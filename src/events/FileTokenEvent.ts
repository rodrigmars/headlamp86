import { EventEmitter } from 'events';

import { createReadStream, existsSync, ReadStream } from 'node:fs'

interface FileJob {
    name: string,
    totalBytes: number
}

interface MessageError {
    message: string,
    timestamp: Date
}

export class FileTokenEvent extends EventEmitter {


    public readonly fileJob: FileJob

    constructor(fileJob: FileJob) {

        super();

        this.fileJob = fileJob

        this.on(`task`, this.task);

        this.on(`check`, this.checkFile);

        this.on(`error`, this.notifyError);

        this.on(`process`, this.processFile);

    }

    private notifyError(message: MessageError): void {

        console.log(message)
    }

    private checkFile(): void {

        if (!existsSync(this.fileJob.name)) {

            this.emit("error", { message: `Arquivo ${this.fileJob.name} não identificado`, timestamp: Date.now() })

            return
        }

        this.emit(`process`)
    }

    private processFile(): void {

        const readStream = createReadStream(this.fileJob.name, { highWaterMark: this.fileJob.totalBytes })

        readStream.on("data", chunk => {

            console.log(chunk.toString(), `total bytes:${readStream.bytesRead}`)

            console.log("--------------")

            readStream.pause();

            setTimeout(() => readStream.resume(), 1000);

        })
            .on("close", () => {
                readStream.destroy()
                console.log("Tarefa processada status OK")
            })

    }

    private task(): void {

        this.emit(`check`)
    }

}

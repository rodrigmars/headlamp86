import { FileDTO } from '../DTO'
import { createReadStream } from 'node:fs'

export function jobFile(fileDTO: FileDTO): void {

    const readStream = createReadStream(fileDTO.name, { highWaterMark: fileDTO.totalBytes })

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


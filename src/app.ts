import { createReadStream, existsSync, ReadStream } from 'node:fs'
import { AppError } from './errors/AppError';

interface User {
    name: string,
    age: number

}

let user: User = {
    name: "teste",
    age: 25
}

interface FileJob {
    name: string,
    totalBytes: number
}

function task(fileJob: FileJob): void {

    if (!existsSync(fileJob.name)) {
        throw new Error(`Arquivo ${fileJob.name} não identificado`);
    }

    const rs: ReadStream = createReadStream(fileJob.name, { highWaterMark: fileJob.totalBytes })

    rs.on("data", chunk => {
        console.log(chunk.toString(), `total bytes:${rs.bytesRead}`)
        console.log("--------------")

    })
        .on("close", () => {
            rs.destroy()
            console.log("Tarefa processada status OK")
        })
}


function main() {

    try {

        task({ name: './src/malac.txt', totalBytes: 4 })

    } catch (err) {

        console.log("Tarefa com status NOK!!!")

        if (err instanceof AppError) {
            // inserir evento para registrar erros
            console.error('error:', err.message)
            return;
        }

        console.error('error:', err)
    }

}

main()
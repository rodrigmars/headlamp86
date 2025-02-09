import { createReadStream } from 'node:fs'

interface User {
    name: string,
    age: number

}

let user: User = {
    name: "teste",
    age: 25
}


function getPlato() {

    const rs = createReadStream('./src/malac.txt', { highWaterMark: 4 })

    const interval: number = 2

    rs.on("data", chunk => {

        setInterval(() => {

            console.log(chunk.toString())
            console.log("--------------")

            throw Error("Logar erro teste")

        }, interval * 1000);

    })

}


function main() {

    try {

        getPlato()

    } catch (err) {
        // inserir evento para registrar erros
        console.error('error:', err)
    }

} 

main()
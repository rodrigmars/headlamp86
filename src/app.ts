import { terraForm } from './service/terraForm'

((fn: CallableFunction) => {

    console.log(`Dispara serviço\n`)

    fn({
        name: `./src/malac.txt`,
        totalBytes: 4
    })

})(terraForm)



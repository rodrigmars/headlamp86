import { FileTokenEvent } from '../events/FileTokenEvent';
import { FileDTO, MessageError } from '../DTO'
import { existsSync } from 'node:fs'
import { jobFile } from '../service/jobFile'

export function terraForm(fileDTO: FileDTO) {

    const fileEvent = new FileTokenEvent(fileDTO)

    fileEvent.once(`check`, (fileDTO: FileDTO) => {

        if (!existsSync(fileDTO.name)) {

            fileEvent.emit(`error`, {
                message: `Arquivo ${fileDTO.name} não identificado`,
                timestamp: Date.now()
            })

            return
        }

        fileEvent.emit(`process`, fileDTO)

    });

    fileEvent.on(`error`, (message: MessageError): void => {
        console.log(message)
    });

    fileEvent.once(`process`, (fileDTO: FileDTO) =>
        jobFile(fileDTO));

    fileEvent.task();
}
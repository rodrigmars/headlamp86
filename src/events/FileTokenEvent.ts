import { EventEmitter } from 'events';

import { FileDTO } from '../DTO'

export class FileTokenEvent extends EventEmitter {

    public readonly fileDTO: FileDTO

    constructor(fileDTO: FileDTO) {

        super();

        this.fileDTO = fileDTO

    }

    task(): void {
        this.emit(`check`, this.fileDTO)
    }

}

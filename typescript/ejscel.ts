import fs = require('fs')
import { file } from './interfaces'

class File implements file {

    constructor(name: string, extension: string = 'txt', separator: string = '|', path: string = './') {
        this.name = name
        this.extension = extension
        this.separator = separator
        this.path = path
    }

    name: string
    extension: string
    separator: string
    path: string

}

let myFile = new File('myFile')
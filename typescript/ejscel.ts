import { file } from './interfaces'

class File implements file {

    constructor(name: string, extension: string = 'txt', separator: string = '|', path: string = './') {
        name = name
        extension = extension
        separator = separator
        path = path
    }

    name: string
    extension: string
    separator: string
    path: string

}

let myFile = new File('myFile')
console.log(myFile)
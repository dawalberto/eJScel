import fs = require('fs')
import { file, fileConstructor } from './interfaces'
import { correctPath } from './utilities'

class File implements file {

    constructor(constructorData:fileConstructor) {
        this.name = constructorData.name
        this.extension = constructorData.extension ? constructorData.extension : 'txt'
        this.separator = constructorData.separator ? constructorData.separator : '|'
        this.path = constructorData.path ? correctPath(constructorData.path) : './'
    }

    name:string
    extension:string
    separator:string
    path:string

}

let myFile = new File({name: 'myFile', path: 'testDir\\'})
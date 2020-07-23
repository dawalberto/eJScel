import fs = require('fs')
import { file, fileConstructor, column } from './interfaces'
import { encoding } from './enums'
import { correctPath } from './utilities'

class File implements file {

    constructor(constructorData:fileConstructor) {
        this.name = constructorData.name
        this.extension = constructorData.extension ? constructorData.extension : 'txt'
        this.path = constructorData.path ? correctPath(constructorData.path) : '../data/to_process/'
        this.encoding = constructorData.encoding ? constructorData.encoding : encoding.latin1
        this.file = `${this.path}${this.name}.${this.extension}`
        this.separator = constructorData.separator ? constructorData.separator : '|'
        this.numCols = constructorData.numCols ? constructorData.numCols : 0
    }

    name:string
    extension:string
    path:string
    encoding:encoding
    file:string
    separator:string
    numCols:number
    cols:column[]
    colsUnion:column[]

    setCols(cols:column[]): void {
        this.cols = cols
    }

    setColsUnion(cols:column[]): void {
        this.colsUnion = cols
    }

    processFile() {
        const data = fs.readFileSync(this.file, this.encoding)
    }

}

let myTestFile:File = new File({name: 'test'})
console.log(myTestFile)
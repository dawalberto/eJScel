import fs = require('fs')
import { file, fileConstructor, column } from './interfaces'
import { encoding } from './enums'
import { throws } from './throws'
import { correctPath } from './utilities'


class File implements file {

    constructor(constructorData:fileConstructor) {
        this.name = constructorData.name
        this.extension = constructorData.extension ? constructorData.extension : 'txt'
        this.path = constructorData.path ? correctPath(constructorData.path) : './data/to_process/'
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

    fileExists(): boolean {

        try {
            fs.readFileSync(this.file, this.encoding)
            return true
        } catch {
            return false
        }

    }

    isFileStructureCorrect() {

        if (!this.fileExists()) {
            throw throws.noSuchFileOrDirectory
        }

        const data:string = fs.readFileSync(this.file, this.encoding)
        const lines:string[] = data.split(/\r?\n/)
        return lines.every(line => line.split(this.separator).length === this.numCols)      

    }

    processFile():void {

        if (!this.isFileStructureCorrect()) {
            throw throws.structureFileIncorrect
        }

        const data:string = fs.readFileSync(this.file, this.encoding)

        const lines:string[] = data.split(/\r?\n/)
        let splitedLine:string[]

        lines.map(line => {

            splitedLine = line.split(this.separator)
            console.log(splitedLine)

        })

    }

}

let myTestFile:File = new File({name: 'test', encoding: encoding.utf_8, numCols: 7})
console.log(myTestFile)
myTestFile.processFile();
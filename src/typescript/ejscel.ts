import fs = require('fs')
import { file, fileConstructor, column } from './interfaces'
import { encoding } from './enums'
import { throws } from './throws'
import { correctPath } from './utilities'


export class File implements file {

    constructor(constructorData:fileConstructor) {
        this.name = constructorData.name
        this.extension = constructorData.extension ? constructorData.extension : 'txt'
        this.path = constructorData.path ? correctPath(constructorData.path) : './data/to_process/'
        this.encoding = constructorData.encoding ? constructorData.encoding : encoding.latin1
        this.file = `${this.path}${this.name}.${this.extension}`
        this.separator = constructorData.separator ? constructorData.separator : '|'
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
    records:string[][] = []

    setCols(cols:column[]): void {
        this.cols = cols
        this.numCols = cols.length
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

    isFileStructureCorrect(): boolean {

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
        let fields:string[]

        lines.forEach(line => {

            fields = line.split(this.separator)
            this.records.push(fields)

        })

    }

}


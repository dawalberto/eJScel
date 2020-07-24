import fs = require('fs')
import { file, fileConstructor, column } from './interfaces'
import { encoding } from './enums'
import { throws } from './throws'
import { correctPath } from './utilities'


export const Files:File[] = []

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
    rows:string[][] = []
    dataToWrite:string = ''

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

    processData(data:string[][]): void {

        data.forEach((row, i) => {

            if (row.length !== this.numCols) {
                this.rows = []
                this.dataToWrite = ''
                throw throws.distinctNumColumnsThanSpecified
            }

            this.rows.push(row)
            this.fillDataToWrite(row, i === data.length - 1)

        })

    }

    fillDataToWrite(row:string[], last:boolean) {

        row.forEach((field, i) => {

            if (i === row.length - 1 && !last) {
                this.dataToWrite += `${field}${this.separator}\n`
            } else {
                this.dataToWrite += `${field}${this.separator}`
            }

        })

    }

    writeDataSync(): void {

        try {
            fs.writeFileSync(this.file, this.dataToWrite, this.encoding)
            this.dataToWrite = ''
            console.log(`${this.file} saved`)
        } catch(e) {
            throw throws.fileWritingFile
        }
    
    }

}

export function findFileByName(name:string): File[] {
    return Files.filter(file => file.name === name)
}


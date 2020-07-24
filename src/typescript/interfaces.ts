import { encoding } from './enums'


export interface file {

    name:string
    extension:string
    separator:string
    path:string
    file:string
    encoding:encoding
    numCols:number
    records:string[][]

}

export interface fileConstructor {

    name:string
    extension?:string
    separator?:string
    path?:string
    encoding?:encoding

}

export interface column {

    name:string
    pos:number

}
import { encoding } from './enums'


export interface file {

    name:string
    extension:string
    separator:string
    path:string
    file:string
    encoding:encoding
    numCols:number

}

export interface fileConstructor {

    name:string
    extension?:string
    separator?:string
    path?:string
    encoding?:encoding
    numCols?:number

}

export interface column {

    name:string
    pos:number

}
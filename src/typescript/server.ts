import * as ejscel from './ejscel'
import { fileConstructor, column } from './interfaces'
import { throws } from './throws'
import express = require('express')
const app = express()

app.use(express.json())


app.get('/files', (req, res) => {

    res.json({
        ok: true,
        response: {
            files: ejscel.Files
        }
    })

})

app.post('/createFile', (req, res) => {

    let constructorData:fileConstructor = req.body.constructorData

    try {
        if (ejscel.findFileByName(constructorData.name).length > 0) {
            res.json({
                ok: false,
                error: throws.duplicateNameFile
            })
        }

        let newFile = new ejscel.File(constructorData)
        ejscel.Files.push(newFile)
        
        res.json({
            ok: true,
            response: {
                file: newFile
            }
        })
    } catch {
        res.json({
            ok: false,
            error: throws.incorrectConstructorData
        })
    }

})

app.post('/createCompleteFile', (req, res) => {

    try {

        let constructorData:fileConstructor = req.body.constructorData
        let cols:column[] = req.body.cols
        let rows:string[][] = req.body.rows
    
        if (ejscel.findFileByName(constructorData.name).length > 0) {
            res.json({
                ok: false,
                error: throws.duplicateNameFile
            })
        }
    
        if(cols === undefined || cols.length === 0) {
            res.json({
                ok: false,
                error: throws.missingColsRequestBody
            })
        }
    
        if(rows === undefined || rows.length === 0) {
            res.json({
                ok: false,
                error: throws.noDataToWrite
            })
        }
        
        let newFile = new ejscel.File(constructorData)
        newFile.setCols(cols)
        newFile.processData(rows)
        newFile.writeDataSync()
        ejscel.Files.push(newFile)
        
        res.json({
            ok: true,
            response: {
                file: newFile
            }
        })

    } catch (e) {
        res.json({
            ok: false,
            error: e
        })        
    }
    
})


app.put('/setCols/:fileName', (req, res) => {

    let fileName:string = req.params.fileName
    let cols:column[] = req.body.cols

    let file:ejscel.File[] = ejscel.findFileByName(fileName)

    if(file.length === 0) {
        res.json({
            ok: false,
            error: throws.noSuchFileOrDirectory
        })
    }

    if(cols === undefined || cols.length === 0) {
        res.json({
            ok: false,
            error: throws.missingColsRequestBody
        })
    }

    file[0].setCols(cols)

    res.json({
        ok: true,
        response: {
            file: file[0]
        }
    })

})

app.put('/fillData/:fileName', (req, res) => {

    let fileName:string = req.params.fileName
    let rows:string[][] = req.body.rows

    let file:ejscel.File[] = ejscel.findFileByName(fileName)

    if(file.length === 0) {
        res.json({
            ok: false,
            error: throws.noSuchFileOrDirectory
        })
    }

    if(rows === undefined || rows.length === 0) {
        res.json({
            ok: false,
            error: throws.noDataToWrite
        })
    }

    try {
        file[0].processData(rows)
        file[0].writeDataSync()

        res.json({
            ok: true,
            response: {
                file: file[0]
            }
        })
    } catch(e) {
        res.json({
            ok: false,
            error: e
        })
    }

})


app.listen(3099, () => {
    console.log(`ejscel listen on port 3099`)
})
import * as ejscel from './ejscel'
import { fileConstructor } from './interfaces'
import { throws } from './throws'
import express = require('express')
const app = express()

app.use(express.json())


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
            newFile
        })
    } catch {
        res.json({
            ok: false,
            error: throws.incorrectConstructorData
        })
    }

})



app.get('/files', (req, res) => {

    res.json({
        ok: true,
        files: ejscel.Files
    })

})


app.listen(3099, () => {
    console.log(`ejscel listen on port 3099`)
})
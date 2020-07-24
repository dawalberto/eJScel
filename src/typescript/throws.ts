export const throws = {

    structureFileIncorrect: {
        code: 1,
        error: 'structureFileIncorrect',
        description: 'Not all records have the same number of columns'
    },
    noSuchFileOrDirectory: {
        code: 2,
        error: 'noSuchFileOrDirectory',
        description: 'No such file or directory'
    },
    incorrectConstructorData: {
        code: 3,
        error: 'incorrectConstructorData',
        description: 'Incorrect constructor data to new file'
    },
    duplicateNameFile: {
        code: 4,
        error: 'duplicateNameFile',
        description: 'File with this name is already created'
    },
    missingColsRequestBody: {
        code: 5,
        error: 'missingColsRequestBody',
        description: 'Missing columns on request body'
    }

}

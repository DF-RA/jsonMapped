import * as fsUtils from 'fs'
import * as pathUtils from 'path'
import * as errors from '../model/ErrorDetail.js'

export function readJson(filePath){
    validateJson(filePath)
    return fsUtils.readFileSync(filePath, {encoding: 'utf8', flag: 'r'})
}

export function readFile(filePath){
    validateFile(filePath)
    return fsUtils.readFileSync(filePath, {encoding: 'utf8', flag: 'r'})
}

export function readPath(directory){
    validatePath(directory)
    return fsUtils.readdirSync(directory)
}

export function createResultFile(filePath, data){
    const fileName = pathUtils.basename(filePath)
    const ext = pathUtils.extname(fileName)
    const absolutePath = pathUtils.dirname( filePath )
    const resultFile = fileName.replace(ext, '_result.text')
    const newFilePath = pathUtils.join(absolutePath, resultFile)
    let fileBody = ''
    data.forEach(line => {
        fileBody += `${line}\n`
    });
    fsUtils.writeFileSync(newFilePath, fileBody)
}

export function createResultMap(filePath, data){
    const fileName = pathUtils.basename(filePath)
    const ext = pathUtils.extname(fileName)
    const absolutePath = pathUtils.dirname( filePath )
    const resultFile = fileName.replace(ext, '_result.csv')
    const newFilePath = pathUtils.join(absolutePath, resultFile)
    fsUtils.writeFileSync(newFilePath, data)
}

function validateFile(filePath){
    if (!fsUtils.existsSync(filePath)) {
        throw errors.fileNotExists(filePath)
    }

    const fileStats = fsUtils.statSync(filePath)
    if(!fileStats.isFile()){
        throw errors.itIsNotAFile(filePath)
    }
}

function validateJson(filePath){
    validateFile(filePath)
    if(pathUtils.extname(filePath) != '.json'){
        throw errors.itIsNotAJson(filePath)
    }
}

function validatePath(filePath){
    if (!fsUtils.existsSync(filePath)) {
        throw errors.pathNotExists(filePath)
    }
    const fileStats = fsUtils.statSync(filePath)
    if(!fileStats.isDirectory()){
        throw errors.itIsNotADirectory(filePath)
    }
}

export function fileNotExists(filePath){
    return new Error(`The file ${filePath} not exists`)
}

export function itIsNotAFile(filePath){
    return new Error(`The path ${filePath} it is not a file`)
}

export function itIsNotADirectory(filePath){
    return new Error(`The path ${filePath} it is not a directory`)
}

export function itIsNotAJson(filePath){
    return new Error(`The path ${filePath} it is not a json`)
}

export function jsonIsEmpty(){
    return new Error('The Json File is empty')
}

export function pathNotExists(filePath){
    return new Error(`The path ${filePath} not exists`)
}
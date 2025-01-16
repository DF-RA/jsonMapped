import * as pathUtils from 'path'
import * as FileService from './FileService.js'
import * as JsonPathService from './JsonPathService.js'
import camelcase from 'lodash.camelcase'

export function getMap(filePath) {
    const file = FileService.readJson(filePath)
    const json = JSON.parse(file)
    const jsonMap = JsonPathService.mappingJson(json)
    return jsonMap
}

export function compareJsonToMap(mapPath, dataPath) {
    const fileMapJson = getMapFromPath(mapPath)
    const mapDataList = getMapFromJsonPath(dataPath)

    const result = fileMapJson.map(row =>{
        const pathList = row.split('.')
        const field = pathList[pathList.length-1]
        return {
            "jsonPath": row,
            "field": camelcase(field),
            "mapped": mapDataList.includes(row)
        }
    })

    return result;

}

function getMapFromPath(mapPath){
    const fileMap = FileService.readFile(mapPath)
    return fileMap.split('\n')
}

function getMapFromJsonPath(dataPath){
    let jsonDataList = []
    if(FileService.isDirectory(dataPath)){
        const jsonList = FileService.readPath(dataPath)
        jsonDataList = jsonList
            .map(file => getMap(pathUtils.join(dataPath, file)))
            .flat();
    } else {
        jsonDataList = getMap(dataPath)
    }
    return [...(new Set(jsonDataList))]
}
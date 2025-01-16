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

export function compareJsonToMap(mapPath, jsonDifPath) {
    const fileMap = FileService.readFile(mapPath)
    const fileMapJson = fileMap.split('\n')

    const jsonList = FileService.readPath(jsonDifPath)

    const jsonDataList = jsonList
        .map(file => getMap(pathUtils.join(jsonDifPath, file)))
        .flat();
    const mapDataList = [...(new Set(jsonDataList))]

    const result = fileMapJson.map(row =>{
        const pathList = row.split('.')
        const field = pathList[pathList.length-1]
        return {
            path: row,
            field: camelcase(field),
            exists: mapDataList.includes(row)
        }
    })

    return result;

}
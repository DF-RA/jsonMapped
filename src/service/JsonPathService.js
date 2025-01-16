import * as errors from '../model/ErrorDetail.js'

export function mappingJson(json) {
    if (!json) {
        throw errors.jsonIsEmpty()
    }
    let setData = new Set(buildNode(json))
    return [...setData]
}

function buildNode(node, parent) {
    let result = []

    if (!parent) {
        parent = '$';
    }

    if (typeof node == 'object' && !Array.isArray(node)) {
        result.push(...mappingObject(node, parent))
    } else if (typeof node == 'object') {
        result.push(...mappingList(node, parent))
    }
    return result
}


function mappingObject(jsonObject, parent) {
    let paths = []
    for (let column in jsonObject) {
        let path = `${parent}.${column}`
        let value = jsonObject[column]
        if (!Array.isArray(value)) {
            paths.push(path)
        }
        paths.push(...buildNode(value, path))
    }
    return paths
}

function mappingList(jsonList, parent) {
    let paths = []
    parent += "[*]";
    paths.push(parent)
    for (let index in jsonList) {
        let row = jsonList[index]
        let result = buildNode(row, parent)
        paths.push(...result)
    }
    return paths
}
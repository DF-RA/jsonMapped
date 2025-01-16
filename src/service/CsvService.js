import { json2csv } from 'json-2-csv';

export function buildCsv(jsonData){
    return json2csv(jsonData)
}
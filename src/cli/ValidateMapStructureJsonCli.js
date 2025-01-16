#! /usr/bin/env node

import * as commander from 'commander'
import * as MappingJsonService from '../service/MappingJsonService.js'
import * as CsvService from '../service/CsvService.js'
import * as FileService from '../service/FileService.js'

try {
    commander.program
        .option('-s, --show')
        .argument('<string>')
        .argument('<string>');

    commander.program.parse();

    const options = commander.program.opts();
    const show = options.show ? true : false;

    const mapPath = commander.program.args[0]
    const dataPath = commander.program.args[1]
    const comparationResult = MappingJsonService.compareJsonToMap(mapPath, dataPath)
    const csv = CsvService.buildCsv(comparationResult)
    FileService.createResultMap(mapPath, csv)
    if(show){
        console.log(csv)
    }
} catch (e) {
    console.log(e.message)
}
#! /usr/bin/env node

import * as commander from 'commander'
import * as MappingJsonService from '../service/MappingJsonService.js'
import * as FileService from '../service/FileService.js'

try {
  commander.program
    .option('-s, --show')
    .argument('<string>');
  commander.program.parse();

  const options = commander.program.opts();
  const show = options.show ? true : false;

  const filePath = commander.program.args[0]
  const jsonMapped = MappingJsonService.getMap(filePath)
  FileService.createResultFile(filePath, jsonMapped)
  if(show){
    jsonMapped.forEach(i => console.log(i))
  }
  
} catch (e) {
  console.log(e.message)
}

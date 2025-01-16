#! /usr/bin/env node

import * as commander from 'commander'
import * as MappingJsonService from '../service/MappingJsonService.js'
import * as FileService from '../service/FileService.js'

try {
  commander.program
    .argument('<string>');
  commander.program.parse();

  const filePath = commander.program.args[0]
  const jsonMapped = MappingJsonService.getMap(filePath)
  FileService.createResultFile(filePath, jsonMapped)
  jsonMapped.forEach(i => console.log(i))
} catch (e) {
  console.log(e.message)
}

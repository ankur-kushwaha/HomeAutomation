var jsonfile = require('jsonfile')
var util = require('util')
 
var file = 'data/rooms.json';
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})
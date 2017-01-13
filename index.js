const path = require('path');
const fs = require('fs-extra');
var moment = require('moment');

var argv = require('minimist')(process.argv.slice(2));
if (!argv.src || !argv.out) {
    console.log('Usage:\n\tnode index.js --src srcDir --out outputDir')
    return;
}

var src = path.resolve(process.cwd(), argv.src);
var out = path.resolve(process.cwd(), argv.out);

var files = fs.readdirSync(src);
for (var i in files) {
    var filename = files[i];
    if (!isNaN(filename[0])) {
        var basename = filename.slice(0, -4);
        var result = moment(basename, 'YYYY-MM-DD HH.mm.ss');
        writeResultToFile(filename, result);
    }
}

function writeResultToFile(filename, result) {
    var year = result.format('YYYY');
    var month = result.format('MMM');
    var day = result.format('D');
    var dir = path.resolve(out, year, year + ' ' + month, year + ' ' + month + ' ' + day);
    fs.ensureDirSync(dir);
    var origin = path.resolve(src, filename);
    var dest = path.resolve(dir, filename);
    console.log('Copying ' + filename + ' to ' + dir);
    fs.copySync(origin, dest);
}
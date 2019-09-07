const path = require('path');
const fs = require('fs');
var moment = require('moment');

var argv = require('minimist')(process.argv.slice(2));
if (!argv.src || !argv.out) {
    console.log('Usage:\n\tnode index.js --src srcDir --out outputDir')
    return;
}

var src = path.resolve(process.cwd(), argv.src);
var out = path.resolve(process.cwd(), argv.out);

fs.readdirSync(src).forEach(file => {
    if (!isNaN(file[0])) {
        var basename = file.slice(0, -4);
        var result = moment(basename, 'YYYY-MM-DD HH.mm.ss');
        writeResultToFile(file, result);
    }
});

function writeResultToFile(filename, result) {
    var year = result.format('YYYY');
    var month = result.format('MMM');
    var day = result.format('D');
    var dir = path.resolve(out, year, year + ' ' + month, year + ' ' + month + ' ' + day);
    
    if (!fs.existsSync(dir)){
    	fs.mkdirSync(dir, {recursive: true});
	}

    var origin = path.resolve(src, filename);
    var dest = path.resolve(dir, filename);
    console.log('Copying ' + filename + ' to ' + dir);
    fs.copyFile(origin, dest, (err) => {
    	if (err) throw err;
    })
}
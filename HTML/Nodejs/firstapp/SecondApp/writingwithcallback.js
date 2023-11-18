const fs = require('fs');

function writeFileWithCallback(path, data, callback){
    fs.writeFile(path, data, 'utf8', (err) => {
        if (err){
            callback(err);
            return;
        }
        callback(null);
    });

}

const filePath = 'writing.txt';
const fileData = 'This is some example content to write in this file';
writeFileWithCallback(filePath, fileData, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully');
});
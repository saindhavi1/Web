const fs = require('fs');

async function writeFileAsync(path, data){
    try {
        await fs.promises.writeFile(path, data, 'utf8');
        console.log('File written syccessfully');
    } catch(err){
        console.error(err);
    }
}

const filePath = 'writingAsync.txt';
const fileData = 'This is some example content to write to the file Async keyword.';

writeFileAsync(filePath, fileData);
console.log('After calling writeFileAsync');
const fs = require('fs');

async function readFileAsync(path){
    try{
        const data = await fs.promises.readFile(path,'utf8');
        console.log(data);
    } catch(err){
        console.error(err);
    }
}

readFileAsync('example.txt');
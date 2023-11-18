const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 4000; //You can use any other port if 3000 is already in use

//Create a server using the http module
const server = http.createServer((req, res) => {
    //Handle requests
    if (req.method === 'GET'){
        let filePath = "." + req.url;
        console.log("filePath is " + filePath);

        //If the request URL is '/' serve the index.html file
        if (filePath === './') {
            filePath = './input.html';
        }

        //Resolve the file path
        const resolvedPath = path.resolve(filePath);

        //Read the file content
        fs.readFile(resolvedPath, (err, data) => {
            if(err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('File not found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
});

//Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
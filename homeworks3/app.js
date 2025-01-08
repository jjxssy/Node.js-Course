const http = require ('http');
const fs = require ('fs');
const path = require('path');
const dirPath= path.join(__dirname , '/templates');

const file2send= fs.readFileSync(`templates/page.html`)

const server = http.createServer(function(req , res){
  res.end(file2send);
});
server.listen(3000);
console.log('node.js web server at port 3000 is running');

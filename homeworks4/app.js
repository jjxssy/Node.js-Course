const http = require('http');
const {readFileSync} = require('fs');
const path = require('path');

// get all files
const pageHtml = readFileSync('./templates/page.html');
const aboutHtml = readFileSync('./templates/about.html');
const contactHtml = readFileSync('./templates/contact.html');
const stylesCss = readFileSync('./templates/styles.css');

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(`Request received for: ${url}`);
  // home page
  if (url === '/' || url === '/home' || url === '/page.html') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(pageHtml);
    res.end();
  }
  // about page
  else if (url === '/about' || url === '/about.html') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(aboutHtml);
    res.end();
  }
  // contact page 
  else if (url === '/contact' || url === '/contact.html') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(contactHtml);
    res.end();
  }
  // Styles
  else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(stylesCss);
    res.end();
  }
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>404 - Page Not Found</h1>');
    res.end();
  }
});
// Start the server
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});

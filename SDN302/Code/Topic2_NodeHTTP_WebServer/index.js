// Import the http module
const http = require('http');
//Khai bao hostname, port number cho web server
const hostname = 'localhost';
const port = 9999;

// Create a server object
const server = http.createServer((req, res) => {
    //Doc thong tin header
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><body>Hello World - NodeJS</body></html>");
});
// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//Khai bao module HTTP
const http = require("http");
const path = require("path");
const fs = require("fs");

// Khai bao thong tin cau hinh cho web server 
const hostname = "localhost";
const port = 9999;

// Khoi tao 1 web server
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
   // console.log(req.headers); // Lấy headers của request
    
    if (req.method == "GET") {
        var fileUrl;
        if (req.url == "/") {
            fileUrl = "/index.html";
        } else {
            fileUrl = req.url;
        }

        var filePath = path.resolve("./" + fileUrl);
        console.log(filePath);
        const fileExt = path.extname(filePath);

        if (fileExt == ".html") {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end("<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>");
                    return;
                }
                
                // Cấu hình response và gửi file nếu tồn tại
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end("<html><body><h1>Error 404: ${fileUrl} not a HTML file</h1></body></html>");
        }
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>");
    }
});

// Kich hoat web server cho phep lang nghe cac request tu Client 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
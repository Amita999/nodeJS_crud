const http = require("http");
const fs = require("fs");

let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

let dataObject = JSON.parse(data);

//Creating a server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName == "/" || pathName == "/overview") {
    console.log(pathName);

    // console.log(JSON.parse(data));
    console.log("Inside home or overview route ");
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // res.end("Hello from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests");
});

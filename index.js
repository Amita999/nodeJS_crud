const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplateFunc = require('./modules/replaceTemplateFunc');
let templateOverview = fs.readFileSync(`./templates/overview.html`, "utf-8");
let templateCard = fs.readFileSync(`./templates/template-card.html`, "utf-8");
let templateProduct = fs.readFileSync(`./templates/product.html`, "utf-8");
let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
 
let dataObject = JSON.parse(data);
 

// console.log(dataObject);
 
//Creating a server
const server = http.createServer((req, res) => {
  const {pathname,query} = url.parse(req.url,true);

  console.log("pathName: ", pathname);
  console.log("Parsing the query parameter: ", url.parse(req.url,true));

  
  //overview page
  if (pathname == "/" || pathname == "/overview") {
    
    console.log("Inside home or overview route ");
    const cardsHtml = dataObject.map((el) =>
      replaceTemplateFunc(templateCard, el)
    ).join(''); 
    const output = templateOverview.replace('{%PRODUCT-CARD%}',cardsHtml)
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);
  }
  //product page
  else if (pathname == "/product") {
    console.log("Inside product page");
    console.log("query: ",query);
    const product = dataObject[query.id];
    const output = replaceTemplateFunc(templateProduct,product);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);
  }
  //page not found
  else {
    console.log("pathname: ", pathname);
    console.log("Inside Not found");
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page Not Found </h1>");
  }
});
 
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests");
});
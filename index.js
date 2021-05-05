const http = require("http");
const fs = require("fs");
const url = require("url");

let templateOverview = fs.readFileSync(`./templates/overview.html`, "utf-8");
let templateCard = fs.readFileSync(`./templates/template-card.html`, "utf-8");
let templateProduct = fs.readFileSync(`./templates/product.html`, "utf-8");
let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
 
let dataObject = JSON.parse(data);
 
const replaceTemplateFunc = (temp, product) => {
  // console.log(temp);
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
 
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
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
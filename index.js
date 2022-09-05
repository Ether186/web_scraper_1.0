const express = require("express");
const fetch = require("isomorphic-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const HTMLparser = require("node-html-parser");
const bodyParser = require("body-parser");

const test = require("./htmlFormat.js");
const htmlFormat = require("./htmlFormat.js");
/* Functions */

function authenticateUrl(url) {
  let urlHttps = url.slice(0, 8);
  let testUrl = "https://";
  if (urlHttps !== testUrl) {
    url = testUrl + url;
  }
  console.log(url);
  return url;
}
//////////////////////////////////////////////
console.log("test");
test.testPrint();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/", async function (req, res) {
  res.send("Thanks for posting that");
  console.log(req.body);
  const website = req.body.websiteOption;
  console.log(website);
  const authenticatedWebsite = authenticateUrl(website);
  console.log(authenticatedWebsite);

  try {
    const response = await fetch(authenticatedWebsite);
    // console.log(response)
    const text = await response.text();
    // console.log(text)
    const dom = await new JSDOM(text);
    const html = dom.window.document.getElementsByTagName("body")[0].innerHTML;
    let root = HTMLparser.parse(html);
    root = root.toString();
    
    htmlFormat.format(root);
  } catch (err) {
    console.log(err);
  }
});
app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

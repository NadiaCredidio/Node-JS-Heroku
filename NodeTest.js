"use strict";
console.log("Server starting");
const Http = require("http");
const Url = require("url");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    console.log(_request.url);
    let query = Url.parse(_request.url, true).query;
    console.log(query);
    let key;
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    /*   for (key in query)
         /*  _response.write(key + ":" + query[key] ); */
    _response.write("Hallo " + query["Vorname"] + " danke f�r deine Bestellung" + "<br>" + "Deine Eisauswahl:" + "<br>");
    _response.write("Peachpuff: " + query["Peachpuff"] + "<br>");
    _response.write("Unicornswirls: " + query["Unicornswirls"] + "<br>");
    _response.write("Schokolade: " + query["Schokolade"] + "<br>");
    _response.write("Kinderschokolade: " + query["Kinderschokolade"] + "<br>");
    _response.write("Kastanie: " + query["Kastanie"] + "<br>");
    _response.write("Zitronensorbe: " + query["Zitronensorbe"] + "<br>");
    _response.write("Yogurt-Kirsch: " + query["Yogurt-Kirsche"] + "<br>");
    _response.write("Blaubeere: " + query["Blaubeere"] + "<br>");
    _response.write("Haselnuss: " + query["Haselnuss"] + "<br>");
    _response.write("Deine Beh�lterauswahl:" + "<br>" + query["Waffel"] + "<br>");
    _response.write(query["Becher"] + "<br>");
    _response.write("Die Bestellung geht an:" + "<br>" + query["surame"] + " " + query["name"] + " " + query["street"] + " " + query["city,postcode"] + "<br>");
    _response.end();
    _response.end();
}
//# sourceMappingURL=NodeTest.js.map
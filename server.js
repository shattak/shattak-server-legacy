//shattak server
  //create server
  //listening port  



console.log("######################################################################");
console.log("======================================================================");
console.log("\t\t\t shattak");
console.log("======================================================================");
console.log("######################################################################");



const http = require("http");
const app = require("./app");
const port = process.env.PORT || 9090;


//create server
const server = http.createServer(app);

//listening port
server.listen(port, () => {
  console.log("server running on port " + port);
  console.log(
    "---------------------------------------------------------------------"
  );
});


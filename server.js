//shattak server
  //create server
  //listening port  

console.log("");
console.log(
  "  .d8888b.   888    888        d8888 88888888888 88888888888        d8888 888    d8P  "
);
console.log(
  "  d88P  Y88b 888    888       d88888     888         888           d88888 888   d8P   "
);
console.log(
  "  Y88b.      888    888      d88P888     888         888          d88P888 888  d8P   "
);
console.log(
  "    Y888b.   8888888888     d88P 888     888         888         d88P 888 888d88K     "
);
console.log(
  "       Y88b. 888    888    d88P  888     888         888        d88P  888 8888888b   "
);
console.log(
  "         888 888    888   d88P   888     888         888       d88P   888 888  Y88b   "
);
console.log(
  "  Y88b  d88P 888    888  d8888888888     888         888      d8888888888 888   Y88b  "
);
console.log(
  "    Y8888P   888    888 d88P     888     888         888     d88P     888 888    Y88b "
);
console.log("");

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

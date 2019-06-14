var express = require("express");
var favicon = require("serve-favicon");

var app = express();

app.set("port", process.env.PORT || 5000);

app.use(favicon(__dirname + "/favicon.ico"));

app.use("/bin", express.static(__dirname + "/bin"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(app.get("port"), function() {
  console.log("App is running on port", app.get("port"));
});

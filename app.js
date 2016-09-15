var express = require("express");
var path = require("path");

var app = express();
var portNumber = 3000;

app.set("port", portNumber);
app.use("/", express.static(path.join(__dirname, "public")));

var fixtures = [
	{ "id": 1, "date": "11.09.2016", "amount": 27, "description": "Catering", "category": "Food" },
	{ "id": 2, "date": "11.09.2016", "amount": 292, "description": "Flight tickets", "category": "Travel" },
	{ "id": 3, "date": "12.09.2016", "amount": 555, "description": "Rent", "category": "Monthly expenses" }
];

app.get("/api/v1/expenses", function (req, res) {
	res.send(fixtures);
});

app.listen(portNumber, function() {
	console.log("Server started");
});

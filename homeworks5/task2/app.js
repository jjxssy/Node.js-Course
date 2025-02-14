const express = require("express");
const app = express();
const port = 3000;
const logger = require("./logger");

app.use(express.json());


app.get("/admin", (req, res) => {
    return res.send("Welcome to the management page!");
});

app.get("/public", (req, res) => {
	res.send("This is public page");
});

app.get("/", (req, res) => {
	res.send("Welcome to the home page!");
});


app.use((req, res, next) => {
    return res.status(403).send("Access Denied");
});

app.use(logger);
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

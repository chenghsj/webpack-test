const express = require("express");

const app = express();

app.use(express.static(`${__dirname}/build`, { maxAge: 1000 * 3600 }));

app.listen(4000);

const express = require("express");

const app = express();

app.get("/health", (req, res) => res.sendStatus(200));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is deployed on port: ${PORT}`));

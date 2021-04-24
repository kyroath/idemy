const express = require("express");

const app = express();

app.get("/health", (req, res) => res.sendStatus(200));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is deployed on port: ${PORT}`));

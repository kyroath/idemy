require("./utils/env").readEnv();

const express = require("express");

const app = require("./app");

const PORT = process.env.PORT || 8000; // 8000 is the default for servers

app.listen(PORT, () => console.log(`Server is deployed on port: ${PORT}`));

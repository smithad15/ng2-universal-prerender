'use strict';

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname)));

const server = app.listen(3000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);
});

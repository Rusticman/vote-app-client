const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');

app.use(express.static(__dirname));
app.use(cors());
require('dotenv').config();

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log('in server auth0', process.env.AUTH0_ID)
console.log('app listening on port', port);

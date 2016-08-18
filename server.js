const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname)); // Current directory is root
// app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.listen(2112);
console.log('Listening on port 2112');

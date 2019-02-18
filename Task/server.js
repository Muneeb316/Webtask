const express = require('express')
const app = express();
const post = require('./controller/data.controller');

const mongoose = require('mongoose')
const config = require('./config.json');

app.listen(8000, () => {
    post();
    console.log('Example app listening on port 8000!')
});


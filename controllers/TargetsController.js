const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json);

module.exports = {
    create:function(req, res, next){
        const body = req.body;
        console.log(body);
    }
}
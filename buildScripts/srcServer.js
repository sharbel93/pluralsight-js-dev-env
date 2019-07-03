// var express = require('express');
import express from 'express';
import path from 'path';
import open from 'open';
// var path = require('path');
// var open = require('open');
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3001;
const app = express();
const compiler = webpack(config);

app.use(
    require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    })
);

//root request endpoint for the server to index.html
app.get('/', function(req,res) {
   res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.get("/users", function(req, res) {
    // Hard coding for simplicity. Pretend this hits a real database
    res.json([
        { id: 1, firstName: "Bob", lastName: "Smith", email: "bob@gmail.com" },
        { id: 2, firstName: "Tammy", lastName: "Norton", email: "tno@yahoo.com" },
        { id: 3, firstName: "Tina", lastName: "Lee", email: "lee.tina@hotmail.com" }
    ]);
});

app.listen(port, function(err){
   if(err) {
       console.log(err);
   } else {
       open('http://localhost:' + port);
   }
});
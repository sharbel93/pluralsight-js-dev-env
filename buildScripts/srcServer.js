// var express = require('express');
import express from 'express';
import path from 'path';
import open from 'open';
// var path = require('path');
// var open = require('open');

const port = 3001;
const app = express();

//root request endpoint for the server to index.html
app.get('/', function(req,res) {
   res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err){
   if(err) {
       console.log(err);
   } else {
       open('http://localhost:' + port);
   }
});
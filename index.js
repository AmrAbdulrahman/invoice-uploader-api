const express = require('express');
const parser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// log requests
app.use((req, res, next) => {
  console.log('>', req.method, req.url);
  next();
});

// mock file id
let fileId = 1;
app.post('/file', fileUpload(), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  // slow down for the sake of showing loaders
  setTimeout(() => {
    res.status(200).send({
      id: fileId++,
      name: req.files.file.name,
    });
  }, 1500);
});

app.delete('/file/:id', parser.json(), (req, res) => {
  // slow down for the sake of showing loaders
  setTimeout(() => {
    res.status(200).send();
  }, 1500);
});

app.post('/invoice', parser.json(), (req, res) => {
  // slow down for the sake of showing loaders
  setTimeout(() => {
    res.status(200).send();
  }, 1500);
});

app.listen(8000, () => console.log('App is listening on port 8000'));

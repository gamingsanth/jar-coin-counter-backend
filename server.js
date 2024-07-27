const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs');

const port = process.env.PORT || 3001;

let count = 0;

app.use(cors());

const filePath = __dirname;

console.log(filePath);

function createFileIfNotExists(filePath, content = '') {
  fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          fs.writeFile(filePath, content, (writeErr) => {
              if (writeErr) {
                  console.error('An error occurred while creating the file:', writeErr);
              } else {
                  console.log('File created successfully.');
              }
          });
      } else {
          console.log('File already exists.');
      }
  });
}

function readFile(req, res) {
  fs.readFile(filePath + "/counter.txt", 'utf8', (err, data) => {
      if (err) {
          console.error('An error occurred while reading the file:', err);
          return;
      }
      console.log('File content:', data);
      res.send({count : data});
  });
}

function increaseCount(req, res) {
  fs.readFile(filePath + "/counter.txt", 'utf8', async (err, data) => {
      if (err) {
          console.error('An error occurred while reading the file:', err);
          return;
      }
      const newContent = Number(data)+1;
      console.log(newContent)
      await fs.writeFile(filePath + "/counter.txt", String(newContent), 'utf8', (err) => {
        //
      });
      res.send();
  });
}

createFileIfNotExists('counter.txt', '0');

app.get("/count",readFile);

app.put("/count",increaseCount);

app.put("/reset", async (req, res) => {
  await fs.writeFile(filePath + "/counter.txt", "0", 'utf8', (err) => {
    //
  });
  res.send();
});


app.listen(port, function() {
  console.log('Server running at :' + port + '/');
});
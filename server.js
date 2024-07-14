const express = require('express');
const app = express();
const cors = require('cors')

const port = process.env.PORT || 3001;

let count = 0;

app.use(cors());

app.get("/count", (req, res) => {
    res.send({ count :  count });
});

app.put("/count", (req, res) => {
    count++;
    res.send();
});

app.listen(port, function() {
  console.log('Server running at :' + port + '/');
});
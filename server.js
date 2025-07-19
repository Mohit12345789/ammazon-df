const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js on EKS!..................');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

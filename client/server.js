const express = require('express');
const path = require('path');
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const PORT = 3000;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);

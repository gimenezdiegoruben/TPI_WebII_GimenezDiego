const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.get('/', (req, res) => {
  res.send('Fotaza 2 funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
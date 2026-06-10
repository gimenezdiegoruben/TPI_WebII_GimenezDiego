const express = require('express');
require('dotenv').config();

const app = express();

const postRoutes = require('./routes/post');

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Fotaza 2'
  });
});

app.use('/posts', postRoutes);

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
const express = require('express');
require('dotenv').config();

const app = express();

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const pool = require('./config/db');

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.get('/', (req, res) => {
  const isLoggedIn = req.query.auth === 'ok';

  res.render('index', {
    title: 'Fotaza 2',
    isLoggedIn
  });
});

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/search', searchRoutes);

pool.connect()
  .then((client) => {
    console.log('Conexión a PostgreSQL establecida correctamente.');
    client.release();
  })
  .catch((error) => {
    console.error('Error al conectar con PostgreSQL:', error.message);
  });

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
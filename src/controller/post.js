const pool = require('../config/db');


// Datos de ejemplo que se mantienen como respaldo mientras la aplicación
// termina de migrarse completamente a PostgreSQL.
const mockPosts = [
  {
    id: 1,
    author: 'Diego Gimenez',
    date: '08/09/2026',
    title: 'Mi primera publicación en Fotaza 2',
    description: 'Publicación inicial de ejemplo para comenzar a construir el muro principal del proyecto.',
    image: 'https://picsum.photos/id/1012/800/400',
    tags: ['fotografia', 'inicio', 'proyecto']
  },
  {
    id: 2,
    author: 'Linus Torvalds',
    date: '09/09/2026',
    title: 'Inspiración tecnológica',
    description: 'La mayoría de los buenos programadores hacen programación no porque esperen ganar dinero o ser adulados por el público, sino porque es divertido programar',
    image: 'https://picsum.photos/id/1005/800/400',
    tags: ['linux', 'software', 'tecnologia']
  },
  {
    id: 3,
    author: 'Guido van Rossum',
    date: '10/09/2026',
    title: 'Creatividad y desarrollo',
    description: 'El código es leído mucho más a menudo de lo que es escrito.',
    image: 'https://picsum.photos/id/1025/800/400',
    tags: ['python', 'programacion', 'backend']
  }
];

//Obtiene el listado de publicaciones.
//Primero intenta leer desde PostgreSQL y, si no hay registros o falla la consulta, usa los datos mock como respaldo temporal.

exports.index = async (req, res) => {
  const isLoggedIn = req.query.auth === 'ok';
  const saved = req.query.saved === '1';

  try {
    const result = await pool.query(`
      SELECT 
        posts.id,
        users.username AS author,
        TO_CHAR(posts.created_at, 'DD/MM/YYYY') AS date,
        posts.title,
        posts.description,
        posts.image_url AS image,
        posts.tags
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);

    const posts = result.rows.map(post => ({
      ...post,
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
    }));

    const finalPosts = posts.length > 0 ? posts : mockPosts;

    res.render('posts/index', {
      title: 'Publicaciones',
      posts: finalPosts,
      isLoggedIn,
      saved
    });
  } catch (error) {
    console.error('Error al obtener publicaciones:', error.message);

    res.render('posts/index', {
      title: 'Publicaciones',
      posts: mockPosts,
      isLoggedIn,
      saved
    });
  }
};

//Muestra el formulario para crear una nueva publicación.
exports.newForm = (req, res) => {
  const isLoggedIn = req.query.auth === 'ok';

  res.render('posts/create', {
    title: 'Nueva publicación',
    isLoggedIn
  });
};

//Obtiene el detalle de una publicación específica desde PostgreSQL. Si no encuentra resultados responde con error 404.
exports.show = async (req, res) => {
  const id = Number(req.params.id);
  const isLoggedIn = req.query.auth === 'ok';
  const commented = req.query.commented === '1';

  if (Number.isNaN(id)) {
    return res.status(400).send('Identificador de publicación inválido.');
  }

  try {
    const postResult = await pool.query(
      `
      SELECT 
        posts.id,
        users.username AS author,
        TO_CHAR(posts.created_at, 'DD/MM/YYYY') AS date,
        posts.title,
        posts.description,
        posts.image_url AS image,
        posts.tags
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      WHERE posts.id = $1
      `,
      [id]
    );

    if (postResult.rows.length === 0) {
      return res.status(404).send('Publicación no encontrada');
    }

    const commentsResult = await pool.query(
      `
      SELECT
        comments.id,
        users.username AS author,
        comments.content,
        TO_CHAR(comments.created_at, 'DD/MM/YYYY HH24:MI') AS date
      FROM comments
      INNER JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at DESC
      `,
      [id]
    );

    const ratingResult = await pool.query(
      `
      SELECT
        COUNT(*)::int AS total_votes,
        COALESCE(ROUND(AVG(value), 1), 0) AS average_rating
      FROM ratings
      WHERE post_id = $1
      `,
      [id]
    );

    const post = {
      ...postResult.rows[0],
      tags: postResult.rows[0].tags
        ? postResult.rows[0].tags.split(',').map(tag => tag.trim())
        : []
    };

    res.render('posts/show', {
      title: post.title,
      post,
      comments: commentsResult.rows,
      rating: ratingResult.rows[0],
      isLoggedIn,
      commented
    });
  } catch (error) {
    console.error('Error al obtener detalle de publicación:', error.message);
    res.status(500).send('No se pudo cargar la publicación.');
  }
};

exports.addComment = async (req, res) => {
  const postId = Number(req.params.id);
  const { content } = req.body;

  if (Number.isNaN(postId)) {
    return res.status(400).send('Identificador de publicación inválido.');
  }
  
  try {
    if (!content || !content.trim()) {
      return res.redirect(`/posts/${postId}?auth=ok`);
    }

    await pool.query(
      `
      INSERT INTO comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      `,
      [postId, 1, content.trim()]
    );

    res.redirect(`/posts/${postId}?auth=ok&commented=1`);
  } catch (error) {
    console.error('Error al guardar comentario:', error.message);
    res.status(500).send('No se pudo guardar el comentario.');
  }
};


//Inserta una nueva publicación en PostgreSQL usando un usuario de prueba. Más adelante este user_id deberá reemplazarse por el usuario autenticado real.
exports.create = async (req, res) => {
  const { title, description, image, tags } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO posts (user_id, title, description, image_url, tags)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [1, title, description, image, tags]
    );

    res.redirect('/posts?auth=ok&saved=1');
  } catch (error) {
    console.error('Error al guardar publicación:', error.message);
    res.status(500).send('No se pudo guardar la publicación.');
  }
};

//Exporta los datos mock para reutilizarlos en otras partes de la aplicación, por ejemplo en el buscador mientras la migración a base de datos sigue en proceso.
exports.mockPosts = mockPosts;

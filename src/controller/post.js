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

exports.index = (req, res) => {
  const isLoggedIn = req.query.auth === 'ok';
  const saved = req.query.saved === '1';

  res.render('posts/index', {
    title: 'Publicaciones',
    posts: mockPosts,
    isLoggedIn,
    saved
  });
};

exports.newForm = (req, res) => {
  const isLoggedIn = req.query.auth === 'ok';

  res.render('posts/create', {
    title: 'Nueva publicación',
    isLoggedIn
  });
};

exports.show = (req, res) => {
  const id = Number(req.params.id);
  const isLoggedIn = req.query.auth === 'ok';
  const post = mockPosts.find(p => p.id === id);

  if (!post) {
    return res.status(404).send('Publicación no encontrada');
  }

  res.render('posts/show', {
    title: post.title,
    post,
    isLoggedIn
  });
};

exports.create = (req, res) => {
  res.redirect('/posts?auth=ok&saved=1');
};

exports.mockPosts = mockPosts; //reutilizar datos en el buscador

const mockPosts = [
  {
    id: 1,
    author: 'Diego Gimenez',
    date: '08/09/2026',
    title: 'Mi primera publicación en Fotaza 2',
    description: 'Publicación inicial de ejemplo para comenzar a construir el muro principal del proyecto.',
    image: 'https://picsum.photos/id/1012/800/400'
  },
  {
    id: 2,
    author: 'Linus Torvalds',
    date: '09/09/2026',
    title: 'Inspiración tecnológica',
    description: 'La mayoría de los buenos programadores hacen programación no porque esperen ganar dinero o ser adulados por el público, sino porque es divertido programar',
    image: 'https://picsum.photos/id/1005/800/400'
  },
  {
    id: 3,
    author: 'Guido van Rossum',
    date: '10/09/2026',
    title: 'Creatividad y desarrollo',
    description: 'El código es leído mucho más a menudo de lo que es escrito.',
    image: 'https://picsum.photos/id/1025/800/400'
  }
];

exports.index = (req, res) => {
  res.render('posts/index', {
    title: 'Publicaciones',
    posts: mockPosts
  });
};

exports.newForm = (req, res) => {
  res.render('posts/create', {
    title: 'Nueva publicación'
  });
};

exports.show = (req, res) => {
  const id = Number(req.params.id);
  const post = mockPosts.find(p => p.id === id);

  if (!post) {
    return res.status(404).send('Publicación no encontrada');
  }

  res.render('posts/show', {
    title: post.title,
    post
  });
};

exports.create = (req, res) => {
  res.redirect('/posts');
};
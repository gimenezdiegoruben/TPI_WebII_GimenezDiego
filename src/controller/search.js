const { mockPosts } = require('./post');

exports.index = (req, res) => {
  const isLoggedIn = req.query.auth === 'ok';
  const term = (req.query.q || '').trim().toLowerCase();

  let results = [];

  if (term) {
    results = mockPosts.filter((post) => {
      const inTitle = post.title.toLowerCase().includes(term);
      const inAuthor = post.author.toLowerCase().includes(term);
      const inTags = post.tags.some(tag => tag.toLowerCase().includes(term));

      return inTitle || inAuthor || inTags;
    });
  }

  res.render('search/search', {
    title: 'Buscar',
    isLoggedIn,
    term,
    results
  });
};

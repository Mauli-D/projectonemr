const Book = require('../Models/book');

exports.index = (req, res) => {
  req.isAuthenticated();

  Book.find({
      author: req.session.userId
    })
    .populate('author')
    .then(books => {
      res.render('books/index', {
        books: books,
        title: 'Archive'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.comics = (req, res) => {
  req.isAuthenticated();

  Book.find({
      author: req.session.userId
    }).comics()
    .populate('author')
    .then(books => {
      res.render('books/index', {
        books: books,
        title: 'Comics'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.sports = (req, res) => {
  req.isAuthenticated();

  Book.find({
      author: req.session.userId
    }).sports()
    .populate('author')
    .then(books => {
      res.render('books/index', {
        books: books,
        title: 'Sports'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.travels = (req, res) => {
  req.isAuthenticated();

  Book.find({
      author: req.session.userId
    }).travels()
    .populate('author')
    .then(books => {
      res.render('books/index', {
        books: books,
        title: 'Travels'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  Book.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(book => {
      res.render('books/show', {
        book: book,
        title: book.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.new = (req, res) => {
  req.isAuthenticated();

  res.render('books/new', {
    title: 'New Book Post'
  });
};

exports.edit = (req, res) => {
  req.isAuthenticated();

  Book.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(book => {
      res.render('books/edit', {
        book: book,
        title: book.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.create = (req, res) => {
  req.isAuthenticated();

  req.body.book.author = req.session.userId;
  Book.create(req.body.book)
    .then(() => {
      req.flash('success', 'New book was created successfully.');
      res.redirect('/books');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/books/new');
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();

  Book.updateOne({
      _id: req.body.id,
      author: req.session.userId
    }, req.body.book, {
      runValidators: true
    })
    .then(() => {
      req.flash('success', 'The book was updated successfully.');
      res.redirect(`/books/${req.body.id}`);
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/books/${req.body.id}/edit`);
    });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();

  Book.deleteOne({
      _id: req.body.id,
      author: req.session.userId
    })
    .then(() => {
      req.flash('success', 'The book was deleted successfully.');
      res.redirect('/books');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/books`);
    });
};
const Publication = require('../Models/publication');

exports.index = (req, res) => {
  req.isAuthenticated();

  Publication.find({
      author: req.session.userId
    })
    .populate('author')
    .then(publications => {
      res.render('publications/index', {
        publications: publications,
        title: 'Archive'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  Publication.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(publication => {
      res.render('publications/show', {
        publication: publication,
        title: publication.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.new = (req, res) => {
  req.isAuthenticated();

  res.render('publications/new', {
    title: 'New Publication Post'
  });
};

exports.edit = (req, res) => {
  req.isAuthenticated();

  Publication.findOne({
      _id: req.params.id,
      author: req.session.userId
    })
    .then(publication => {
      res.render('publications/edit', {
        publication: publication,
        title: publication.title
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.create = (req, res) => {
  req.isAuthenticated();

  req.body.publication.author = req.session.userId;
  Publication.create(req.body.publication)
    .then(() => {
      req.flash('success', 'New publication was created successfully.');
      res.redirect('/publications');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/publications/new');
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();

  Publication.updateOne({
      _id: req.body.id,
      author: req.session.userId
    }, req.body.publication, {
      runValidators: true
    })
    .then(() => {
      req.flash('success', 'The publication was updated successfully.');
      res.redirect(`/publications/${req.body.id}`);
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/publications/${req.body.id}/edit`);
    });
};

exports.destroy = (req, res) => {
  Publication.deleteOne({
    _id: req.body.id
  })
  .then(() => {
    res.redirect('/publications');
  })
  .catch(err => {
    console.error(`ERROR: ${err}`);
  });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();

  Publication.deleteOne({
      _id: req.body.id,
      author: req.session.userId
    })
    .then(() => {
      req.flash('success', 'The publication was deleted successfully.');
      res.redirect('/publications');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect(`/publications`);
    });
};
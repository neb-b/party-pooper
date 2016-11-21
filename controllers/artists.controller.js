import Promise from 'bluebird';
import Boom from 'boom';

function ArtistController(opts = {}) {
  if (!(this instanceof ArtistController)) {
    return new ArtistController(opts);
  }

  this.Artist = opts.Artist || {};
}

ArtistController.prototype.getArtists = function getArtists(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.Artist.find())
    .then(artists => res.send(artists))
    .catch(() => next(Boom.notFound('No artists found')));
};

ArtistController.prototype.getArtist = function getArtist(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.Artist.findById(req.params.id))
    .then(artist => res.send(artist))
    .catch(() => next(Boom.notFound('Artist not found')));
};

ArtistController.prototype.createArtist = function createArtist(req, res, next) {
  const { name } = req.body;

  return this.Artist.createAndSave({ name })
    .then(newArtist => res.send(newArtist))
    .catch(err => next(Boom.wrap(err)));
};

ArtistController.prototype.updateArtist = function updateArtist(req, res, next) {
  return Promise.resolve(this.Artist.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(artist => res.send(artist))
    .catch(err => next(Boom.wrap(err)));
};

ArtistController.prototype.deleteArtist = function deleteArtist(req, res, next) {
  return Promise.resolve(this.Artist.findByIdAndRemove(req.params.id))
    .then(artist => res.send(artist))
    .catch(err => next(Boom.wrap(err)));
};


export default ArtistController;
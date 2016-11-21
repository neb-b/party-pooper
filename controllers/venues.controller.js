import Promise from 'bluebird';
import Boom from 'boom';

function VenueController(opts = {}) {
  if (!(this instanceof VenueController)) {
    return new VenueController(opts);
  }

  this.Venue = opts.Venue || {};
}

VenueController.prototype.getVenues = function getVenues(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.Venue.find())
    .then(venues => res.send(venues))
    .catch(() => next(Boom.notFound('No venues found')));
};

VenueController.prototype.getVenue = function getVenue(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.Venue.findById(req.params.id))
    .then(venue => res.send(venue))
    .catch(() => next(Boom.notFound('Venue not found')));
};

VenueController.prototype.createVenue = function createVenue(req, res, next) {
  const { name } = req.body;

  return this.Venue.createAndSave({ name })
    .then(newVenue => res.send(newVenue))
    .catch(err => next(Boom.wrap(err)));
};

VenueController.prototype.updateVenue = function updateVenue(req, res, next) {
  return Promise.resolve(this.Venue.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(venue => res.send(venue))
    .catch(err => next(Boom.wrap(err)));
};

VenueController.prototype.deleteVenue = function deleteVenue(req, res, next) {
  return Promise.resolve(this.Venue.findByIdAndRemove(req.params.id))
    .then(venue => res.send(venue))
    .catch(err => next(Boom.wrap(err)));
};


export default VenueController;
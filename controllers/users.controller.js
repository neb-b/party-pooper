import Promise from 'bluebird';
import Boom from 'boom';

function UserController(opts = {}) {
  if (!(this instanceof UserController)) {
    return new UserController(opts);
  }

  this.User = opts.User || {};
}

UserController.prototype.getUser = function getUser(req, res, next) {
  // Queries are not promises.
  return Promise.resolve(this.User.findById(req.params.id))
    .then(user => res.send(user))
    .catch(() => next(Boom.notFound('User not found')));
};

UserController.prototype.createUser = function createUser(req, res, next) {
  const { username, name, email } = req.body;

  return Promise.resolve(new this.User({ username, name, email }))
    .then(user => Promise.resolve(user.save()))
    .then(newUser => res.send(newUser))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.updateUser = function updateUser(req, res, next) {
  return Promise.resolve(this.User.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.deleteUser = function deleteUser(req, res, next) {
  return Promise.resolve(this.User.findByIdAndRemove(req.params.id))
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

export default UserController;

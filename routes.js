import { Router } from 'express';

import UserController from './controllers/users.controller';
import VenueController from './controllers/venues.controller';
import EventController from './controllers/events.controller';
import ArtistController from './controllers/artists.controller';

import UserModel from './models/user.models';
import VenueModel from './models/venue.models';
import EventModel from './models/event.models';
import ArtistModel from './models/artist.models';

import User from '../models/user';

const instanciation = () => {
  return {
    User: new UserController ({ UserModel })
    Venue: new VenueController ({ VenueModel })
    Event: new EventController ({ EventModel })
    Artist: new ArtistController ({ ArtistModel })
  };
};

const Routing = () => {
  const router = new Router();
  var Controllers = instanciation();

  // User Routes
  router.get('/users/:id', Controller.Users.getUser.bind(Controller.Users));
  router.post('/users', Controller.Users.createUser.bind(Controller.Users));
  router.patch('/users/:id', Controller.Users.updateUser.bind(Controller.Users));
  router.delete('/users/:id', Controller.Users.deleteUser.bind(Controller.Users));

  return router;
};

export default Routing;

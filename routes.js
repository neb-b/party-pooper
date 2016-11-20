import { Router } from 'express';

import UserController from './controllers/users.controller';
import VenueController from './controllers/venues.controller';
import EventController from './controllers/events.controller';
import ArtistController from './controllers/artists.controller';

import UserModel from './models/user.model';
import VenueModel from './models/venue.model';
import EventModel from './models/event.model';
import ArtistModel from './models/artist.model';

const instantiation = () => {
  return {
    Users: new UserController ({ UserModel }),
    Events: new EventController ({ EventModel }),
    Venues: new VenueController ({ VenueModel }),
    Artists: new ArtistController ({ ArtistModel })
  };
};

const Routing = () => {
  const router = new Router();
  var Controllers = instantiation();

  // User Routes
  router.get('/users/:id', Controllers.Users.getUser.bind(Controllers.Users));
  router.post('/users', Controllers.Users.createUser.bind(Controllers.Users));
  router.patch('/users/:id', Controllers.Users.updateUser.bind(Controllers.Users));
  router.delete('/users/:id', Controllers.Users.deleteUser.bind(Controllers.Users));

  // Event Routes
  router.get('/events/:id', Controllers.Events.getEvent.bind(Controllers.Events));
  router.get('/events', Controllers.Events.getEvents.bind(Controllers.Events));
  router.post('/events', Controllers.Events.createEvent.bind(Controllers.Events));
  router.patch('/events/:id', Controllers.Events.updateEvent.bind(Controllers.Events));
  router.delete('/events/:id', Controllers.Events.deleteEvent.bind(Controllers.Events));

  return router;
};

export default Routing;

import { Router } from 'express';

import UserController from './controllers/users.controller';
import VenueController from './controllers/venues.controller';
import EventController from './controllers/events.controller';
import ArtistController from './controllers/artists.controller';

import User from './models/user.model';
import Venue from './models/venue.model';
import Event from './models/event.model';
import Artist from './models/artist.model';

const instantiation = () => {
  return {
    Users: new UserController ({ User }),
    Events: new EventController ({ Event }),
    Venues: new VenueController ({ Venue }),
    Artists: new ArtistController ({ Artist })
  };
};

const Routing = () => {
  const router = new Router();
  var Controllers = instantiation();

  // User Routes
  router.get('/users/:id', Controllers.Users.getUser.bind(Controllers.Users));
  router.get('/users', Controllers.Users.getUsers.bind(Controllers.Users));
  router.post('/users', Controllers.Users.createUser.bind(Controllers.Users));
  router.patch('/users/:id', Controllers.Users.updateUser.bind(Controllers.Users));
  router.delete('/users/:id', Controllers.Users.deleteUser.bind(Controllers.Users));

  // Event Routes
  router.get('/events/:id', Controllers.Events.getEvent.bind(Controllers.Events));
  router.get('/events', Controllers.Events.getEvents.bind(Controllers.Events));
  router.post('/events', Controllers.Events.createEvent.bind(Controllers.Events));
  router.patch('/events/:id', Controllers.Events.updateEvent.bind(Controllers.Events));
  router.delete('/events/:id', Controllers.Events.deleteEvent.bind(Controllers.Events));

  // Venue Routes
  router.get('/venues/:id', Controllers.Venues.getVenue.bind(Controllers.Venues));
  router.get('/venues/:id/profile', Controllers.Venues.getProfile.bind(Controllers.Venues));
  router.get('/venues', Controllers.Venues.getVenues.bind(Controllers.Venues));
  router.post('/venues', Controllers.Venues.createVenue.bind(Controllers.Venues));
  router.patch('/venues/:id', Controllers.Venues.updateVenue.bind(Controllers.Venues));
  router.delete('/venues/:id', Controllers.Venues.deleteVenue.bind(Controllers.Venues));

  return router;
};

export default Routing;

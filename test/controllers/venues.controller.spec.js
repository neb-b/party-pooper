import td from 'testdouble';
import _ from 'lodash';

import VenueController from '../../controllers/venues.controller';

describe('VenueController', () => {
  afterEach(() => td.reset());

  context('getVenues', () => {
    it('returns a list of venues', (done) => {
      let controller = new VenueController();
      let venues = [ 1, 2, 3, 4];
      let mockResponse = { send: td.function() };
      controller.Venue = { find: td.function() };

      td.when(controller.Venue.find()).thenReturn(venues);
      td.when(mockResponse.send(venues)).thenDo(() => done());

      controller.getVenues(_.noop, mockResponse, _.noop);
    });
  });

  context('getVenue', () => {
    it('returns an venue', (done) => {
      let controller = new VenueController();
      let venue = { name: 'test-venue' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Venue = { findById: td.function() };

      td.when(controller.Venue.findById(mockRequest.params.id)).thenReturn(venue);
      td.when(mockResponse.send(venue)).thenDo(() => done());

      controller.getVenue(mockRequest, mockResponse, _.noop);
    });
  });

  context('createVenue', () => {
    it('returns new venue', (done) => {
      let controller = new VenueController();
      let venue = { name: 'test-name' };
      let mockResponse = { send: td.function() };
      let mockRequest = { body: { name: 'test-name'} };
      controller.Venue = { createAndSave: td.function() };

      td.when(controller.Venue.createAndSave(mockRequest.body)).thenResolve(venue);
      td.when(mockResponse.send(venue)).thenDo(() => done());

      controller.createVenue(mockRequest, mockResponse, _.noop);
    });
  });

  context('updateVenue', () => {
    it('returns new updated venue', (done) => {
      let controller = new VenueController();
      let venue = { name: 'test-name' };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        params: { id: 'test-id' },
        body: { name: 'test-name'}
      };
      controller.Venue = { findByIdAndUpdate: td.function() };

      td.when(controller.Venue.findByIdAndUpdate(mockRequest.params.id, mockRequest.body, { new: true }))
        .thenReturn(venue);
      td.when(mockResponse.send(venue)).thenDo(() => done());

      controller.updateVenue(mockRequest, mockResponse, _.noop);
    });
  });

  context('deleteVenue', () => {
    it('returns deleted venue', (done) => {
      let controller = new VenueController();
      let venue = { name: 'test-venue' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Venue = { findByIdAndRemove: td.function() };

      td.when(controller.Venue.findByIdAndRemove(mockRequest.params.id)).thenReturn(venue);
      td.when(mockResponse.send(venue)).thenDo(() => done());

      controller.deleteVenue(mockRequest, mockResponse, _.noop);
    });
  });
});

import td from 'testdouble';
import _ from 'lodash';

import EventController from '../../controllers/events.controller';

describe('EventController', () => {
  afterEach(() => td.reset());

  context('getEvents', () => {
    it('returns a list of events', (done) => {
      let controller = new EventController();
      let events = [ 1, 2, 3, 4];
      let mockResponse = { send: td.function() };
      controller.Event = { find: td.function() };

      td.when(controller.Event.find()).thenReturn(events);
      td.when(mockResponse.send(events)).thenDo(() => done());

      controller.getEvents(_.noop, mockResponse, _.noop);
    });
  });

  context('getEvent', () => {
    it('returns an event', (done) => {
      let controller = new EventController();
      let event = { name: 'test-event' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Event = { findById: td.function() };

      td.when(controller.Event.findById(mockRequest.params.id)).thenReturn(event);
      td.when(mockResponse.send(event)).thenDo(() => done());

      controller.getEvent(mockRequest, mockResponse, _.noop);
    });
  });

  context('createEvent', () => {
    it('returns new event', (done) => {
      let controller = new EventController();
      let event = { name: 'test-name' };
      let mockResponse = { send: td.function() };
      let mockRequest = { body: { name: 'test-name'} };
      controller.Event = { createAndSave: td.function() };

      td.when(controller.Event.createAndSave(mockRequest.body)).thenResolve(event);
      td.when(mockResponse.send(event)).thenDo(() => done());

      controller.createEvent(mockRequest, mockResponse, _.noop);
    });
  });

  context('updateEvent', () => {
    it('returns new updated event', (done) => {
      let controller = new EventController();
      let event = { name: 'test-name' };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        params: { id: 'test-id' },
        body: { name: 'test-name'}
      };
      controller.Event = { findByIdAndUpdate: td.function() };

      td.when(controller.Event.findByIdAndUpdate(mockRequest.params.id, mockRequest.body, { new: true }))
        .thenReturn(event);
      td.when(mockResponse.send(event)).thenDo(() => done());

      controller.updateEvent(mockRequest, mockResponse, _.noop);
    });
  });

  context('deleteEvent', () => {
    it('returns deleted event', (done) => {
      let controller = new EventController();
      let event = { name: 'test-event' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Event = { findByIdAndRemove: td.function() };

      td.when(controller.Event.findByIdAndRemove(mockRequest.params.id)).thenReturn(event);
      td.when(mockResponse.send(event)).thenDo(() => done());

      controller.deleteEvent(mockRequest, mockResponse, _.noop);
    });
  });
});

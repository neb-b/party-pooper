import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';

import EventController from '../../controllers/events.controller';

describe('EventController', () => {
  let controller;

  afterEach(() => td.reset());

  context('getEvents', () => {
    beforeEach(() => controller = new EventController());
    afterEach(() => td.reset());

    it('returns a list of events', (done) => {
      let events = [ 1, 2, 3, 4];
      let mockResponse = { send: td.function() };
      controller.Event = { find: td.function() };

      td.when(controller.Event.find()).thenReturn(events);
      td.when(mockResponse.send(events)).thenDo(() => done());

      controller.getEvents(_.noop, mockResponse, _.noop);
    });

    it('returns a 404 if no events are found', (done) => {
      let mockNext = td.function();
      let mockError = Boom.notFound('No events found');
      controller.Event = { find: td.function() };

      td.when(controller.Event.find()).thenReject(mockError);
      td.when(mockNext(mockError)).thenDo(() => done());

      controller.getEvents(_.noop, _.noop, mockNext);
    });
  });

  context('getEvent', () => {
    beforeEach(() => controller = new EventController());
    afterEach(() => td.reset());

    it('returns an event', (done) => {
      let event = { name: 'test-event' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Event = { findById: td.function() };

      td.when(controller.Event.findById(mockRequest.params.id)).thenReturn(event);
      td.when(mockResponse.send(event)).thenDo(() => done());

      controller.getEvent(mockRequest, mockResponse, _.noop);
    });

    it('returns a 404 if no event is found', (done) => {
      let mockNext = td.function();
      let mockError = Boom.notFound('Event not found');
      let mockRequest = { params: { id: 'test-id'} };
      controller.Event = { findById: td.function() };

      td.when(controller.Event.findById(mockRequest.params.id)).thenReject(mockError);
      td.when(mockNext(mockError)).thenDo(() => done());

      controller.getEvent(mockRequest, _.noop, mockNext);
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

    it.skip('returns 500 if bad parameters are passed', (done) => {
      let controller = new EventController();
      let mockRequest = { body: { bad: 'test-name'} };
      controller.Event = { createAndSave: td.function() };



      return controller.createEvent(mockRequest, _.noop, done)
        .catch(err => expect(err.statusCode).to.equal(500));
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

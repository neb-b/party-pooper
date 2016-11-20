import td from 'testdouble';
import _ from 'lodash';

import EventController from '../../controllers/events.controller';

describe('EventController', () => {
  afterEach(() => {
    td.reset();
  });

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
      let mockRequest = { params: { id: 'test-id '} };
      controller.Event = { findById: td.function() };

      td.when(controller.Event.findById(mockRequest.params.id)).thenReturn(event);
      td.when(mockResponse.send(event)).thenDo(() => done());

      controller.getEvent(mockRequest, mockResponse, _.noop);
    });
  });
});

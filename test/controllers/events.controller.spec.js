import td from 'testdouble';
import _ from 'lodash';

import EventController from '../../controllers/events.controller';

describe('EventController', () => {
  context('getEvents', () => {
    it('returns a list of events', (done) => {
      let controller = new EventController();
      let events = [ 1, 2, 3, 4];

      let mockResponse = {
        send: td.function()
      };

      controller.Event = {
        find: td.function()
      };

      td.when(controller.Event.find()).thenReturn(events);
      td.when(mockResponse.send(events)).thenDo(() => done());
      
      controller.getEvents(_.noop, mockResponse, _.noop);
    });
  });
});
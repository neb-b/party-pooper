import td from 'testdouble';
import _ from 'lodash';

import BoomMiddleware from '../../middlewares/boom.middleware';

describe('BoomMiddleware', () => {
  afterEach(() => td.reset());

  it('handles 404 errors', (done) => {
    let mockResponse = { send: td.function(), status: td.function() };
    let mockError = {
      output: {
        payload: 'test-payload',
        statusCode: 404
      }
    };

    td.when(mockResponse.send(mockError.output.payload))
      .thenDo(() => done());


    BoomMiddleware(mockError, _.noop, mockResponse, _.noop);
  });

  it('handles 500 errors', (done) => {
    let mockError = 'test-error';
    let mockResponse = { send: td.function(), status: td.function() };

    td.when(mockResponse.status(500))
      .thenReturn(mockResponse);

    td.when(mockResponse.send(mockError))
      .thenDo(() => done());

    BoomMiddleware(mockError, _.noop, mockResponse, _.noop);
  });
});

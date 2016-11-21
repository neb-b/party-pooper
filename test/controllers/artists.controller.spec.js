import td from 'testdouble';
import _ from 'lodash';

import ArtistController from '../../controllers/artists.controller';

describe('ArtistController', () => {
  afterEach(() => td.reset());

  context('getArtists', () => {
    it('returns a list of artists', (done) => {
      let controller = new ArtistController();
      let artists = [ 1, 2, 3, 4];
      let mockResponse = { send: td.function() };
      controller.Artist = { find: td.function() };

      td.when(controller.Artist.find()).thenReturn(artists);
      td.when(mockResponse.send(artists)).thenDo(() => done());

      controller.getArtists(_.noop, mockResponse, _.noop);
    });
  });

  context('getArtist', () => {
    it('returns an artist', (done) => {
      let controller = new ArtistController();
      let artist = { name: 'test-artist' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Artist = { findById: td.function() };

      td.when(controller.Artist.findById(mockRequest.params.id)).thenReturn(artist);
      td.when(mockResponse.send(artist)).thenDo(() => done());

      controller.getArtist(mockRequest, mockResponse, _.noop);
    });
  });

  context('createArtist', () => {
    it('returns new artist', (done) => {
      let controller = new ArtistController();
      let artist = { name: 'test-name' };
      let mockResponse = { send: td.function() };
      let mockRequest = { body: { name: 'test-name'} };
      controller.Artist = { createAndSave: td.function() };

      td.when(controller.Artist.createAndSave(mockRequest.body)).thenResolve(artist);
      td.when(mockResponse.send(artist)).thenDo(() => done());

      controller.createArtist(mockRequest, mockResponse, _.noop);
    });
  });

  context('updateArtist', () => {
    it('returns new updated artist', (done) => {
      let controller = new ArtistController();
      let artist = { name: 'test-name' };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        params: { id: 'test-id' },
        body: { name: 'test-name'}
      };
      controller.Artist = { findByIdAndUpdate: td.function() };

      td.when(controller.Artist.findByIdAndUpdate(mockRequest.params.id, mockRequest.body, { new: true }))
        .thenReturn(artist);
      td.when(mockResponse.send(artist)).thenDo(() => done());

      controller.updateArtist(mockRequest, mockResponse, _.noop);
    });
  });

  context('deleteArtist', () => {
    it('returns deleted artist', (done) => {
      let controller = new ArtistController();
      let artist = { name: 'test-artist' };
      let mockResponse = { send: td.function() };
      let mockRequest = { params: { id: 'test-id'} };
      controller.Artist = { findByIdAndRemove: td.function() };

      td.when(controller.Artist.findByIdAndRemove(mockRequest.params.id)).thenReturn(artist);
      td.when(mockResponse.send(artist)).thenDo(() => done());

      controller.deleteArtist(mockRequest, mockResponse, _.noop);
    });
  });
});

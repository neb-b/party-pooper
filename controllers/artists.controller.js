function ArtistController(opts = {}) {
  if (!(this instanceof ArtistController)) {
    return new ArtistController(opts);
  }

  this.Event = opts.Event || {};
}

export default ArtistController;
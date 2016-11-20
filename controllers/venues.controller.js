function VenueController(opts = {}) {
  if (!(this instanceof VenueController)) {
    return new VenueController(opts);
  }

  this.Event = opts.Event || {};
}

export default VenueController;
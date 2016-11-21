import Promise from 'bluebird';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

ArtistSchema.statics.createAndSave = Promise.method(function (props) {
  let newArtist = new ArtistModel(props);

  newArtist.save(function(err, result) {
    if(err) {
      throw new Error(err);
    }

    return result;
  });

  return newEvent
});

const ArtistModel = mongoose.model('Artist', ArtistSchema);

export default ArtistModel;

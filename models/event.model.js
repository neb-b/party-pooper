import Promise from 'bluebird';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Event = new Schema({
  name: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

Event.statics.createAndSave = Promise.method(function (props) {
  let newEvent = new User(props);

  newEvent.save(function(err, result) {
    if(err) {
      throw new Error(err);
    }
    
    return newEvent;
  });
});

export default mongoose.model('Event', Event);

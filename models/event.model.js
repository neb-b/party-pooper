import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Event = new Schema({
  name: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Event', Event);

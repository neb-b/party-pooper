import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: 'String', required: true },
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  email: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);

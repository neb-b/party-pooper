import Promise from 'bluebird';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: 'String', required: true },
  username: { type: 'String', required: true },
  email: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

UserSchema.statics.createAndSave = Promise.method(function (props) {
  let newUser = new UserModel(props);

  newUser.save((err, result) => {
    if(err) {
      throw new Error(err);
    }

    return result;
  });

  return newUser
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;

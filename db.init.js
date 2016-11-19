import Promise from 'bluebird';
import mongoose from 'mongoose';

export default function() {
  const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/party-pooper';
  
  // Set bluebird promises as mongoose promise
  mongoose.Promise = Promise; //TODO sprada: Investigate if promisifying this is better.
  mongoose.connect(mongoURL, error => {
    if(error) {
      console.error(`RUN  Mongodb !`);
      throw error;
    }
    
    console.error(`Connected to Mongodb instance at ${mongoURL}!`);
  });  
}

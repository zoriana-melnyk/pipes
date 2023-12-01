import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  console.log('connecting DB...');
  const instance = await mongoose.connect('mongodb://localhost:27017/pipes');
  console.log('DB connected');
  return instance;
};

export default connectDB;

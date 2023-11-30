import mongoose from 'mongoose';

const connectionInstance = mongoose.connect('mongodb://localhost:27017/pipes');

export default connectionInstance;
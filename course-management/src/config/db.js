const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/CourseManage';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('Database is connected');
}

module.exports = { connectDB };

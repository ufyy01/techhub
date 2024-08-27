import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Already connected to the database.');
    return;
  }

  if (connectionState === 2) {
    console.log('Reconnecting to the database...');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: 'tech-hub',
      bufferCommands: true,
    });
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

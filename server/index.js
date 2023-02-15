import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/',(req,res) => {
  res.send('Hello to Memories API');
});

const PORT = process.env.PORT;

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
      .then(() => console.log('connected to mongo'))
      .catch((err) => {
        console.error('failed to connect with mongo');
        console.error(err);
      });
  };
const startServer = async () => {
    try {
      connectDB(process.env.CONNECTION_URL);
      app.listen(PORT, () => console.log(`Server started on port http://localhost:${process.env.PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
const fileUpload = require('express-fileupload');

const app = express();

//use cors
app.use(cors());
app.use(fileUpload());

//parse json
app.use(express.json());

//config dotenv
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log('Connection to mongodb has been established');
}).catch((err) => console.log(err));

//import routes
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { postCommentRouter } from './routes/postComment';

app.use('/image', express.static(process.cwd() + '/src/public'));

app.use('/user', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter)
app.use('/postComment', postCommentRouter);

const PORT: string | 5000 = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});

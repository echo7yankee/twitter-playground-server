
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketio from 'socket.io';

const fileUpload = require('express-fileupload');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, _callback) => {
    console.log('User has joined');
    console.log({ name, room });
  })

  socket.on('disconnect', () => {
    console.log('Disconnecting');
  })
})

//use cors
app.use(cors());
// file upload
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
import { notificationRouter } from './routes/notification';

app.use('/image', express.static(process.cwd() + '/src/public'));

app.use('/user', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter)
app.use('/postComment', postCommentRouter);
app.use('/notification', notificationRouter)

const PORT: string | 5000 = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});

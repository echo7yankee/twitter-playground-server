"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const fileUpload = require('express-fileupload');
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, _callback) => {
        console.log('User has joined');
        console.log({ name, room });
    });
    socket.on('disconnect', () => {
        console.log('Disconnecting');
    });
});
app.use(cors_1.default());
app.use(fileUpload());
app.use(express_1.default.json());
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('Connection to mongodb has been established');
}).catch((err) => console.log(err));
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const post_1 = require("./routes/post");
const postComment_1 = require("./routes/postComment");
const notification_1 = require("./routes/notification");
app.use('/image', express_1.default.static(process.cwd() + '/src/public'));
app.use('/user', auth_1.authRouter);
app.use('/user', user_1.userRouter);
app.use('/post', post_1.postRouter);
app.use('/postComment', postComment_1.postCommentRouter);
app.use('/notification', notification_1.notificationRouter);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} is running`);
});
//# sourceMappingURL=index.js.map
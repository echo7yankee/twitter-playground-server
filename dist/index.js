"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const fileUpload = require('express-fileupload');
const app = express_1.default();
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
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} is running`);
});
//# sourceMappingURL=index.js.map
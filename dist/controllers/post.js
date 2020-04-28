"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostController {
    constructor(postDao, postCommentDao, userDao) {
        this.addPost = async (req, res) => {
            try {
                const { userId, username, profileImg } = req.query;
                const user = await this.userDao.findById(userId);
                const processedUser = Object.assign(Object.assign({}, user.toJSON()), { id: user._id });
                delete processedUser._id;
                delete processedUser.confirmPassword;
                delete processedUser.password;
                if (!userId) {
                    return res.status(400).json({ error: "Something went wrong" });
                }
                const newPost = Object.assign(Object.assign({}, req.body), { likes: 0, userId,
                    username,
                    profileImg, user: processedUser });
                const post = await this.postDao.add(newPost);
                return res.status(200).json(post);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getPosts = async (req, res) => {
            try {
                const { userId } = req.query;
                const posts = await this.postDao.find({ userId });
                if (!posts) {
                    return res.status(400).json({ error: 'Posts not found' });
                }
                const processedPosts = posts.map(post => {
                    const newPost = Object.assign(Object.assign({}, post.toJSON()), { id: post._id });
                    delete newPost._id;
                    return newPost;
                });
                return res.status(200).json(processedPosts);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getAllPosts = async (req, res) => {
            try {
                const params = req.query;
                const posts = await this.postDao.find(params);
                const postComments = await this.postCommentDao.find({});
                if (!postComments) {
                    return res.status(400).json({ error: 'Post Comment do not exist or user does not exist' });
                }
                if (!posts) {
                    return res.status(400).json({ error: 'Posts not found' });
                }
                const processedPostComments = postComments.map((postComment) => {
                    const newPostComment = Object.assign(Object.assign({}, postComment.toJSON()), { id: postComment._id });
                    delete newPostComment._id;
                    return newPostComment;
                }).sort((a, b) => {
                    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
                });
                const processedPosts = posts.map((post) => {
                    const newPost = Object.assign(Object.assign({}, post.toJSON()), { id: post._id, postComments: processedPostComments.filter((postComment) => {
                            return post._id.equals(postComment.postId);
                        }) });
                    delete newPost._id;
                    return newPost;
                });
                processedPosts.sort((a, b) => {
                    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
                });
                return res.status(200).json(processedPosts);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getPost = async (req, res) => {
            try {
                const { postId } = req.params;
                const post = await this.postDao.findOne({ uuid: postId });
                const postComments = await this.postCommentDao.find({ postId: post._id });
                if (!post) {
                    return res.status(400).json({ error: 'Post does not exist' });
                }
                const processedPostComments = postComments.map((comment) => {
                    let newComments = Object.assign(Object.assign({}, comment.toJSON()), { id: comment._id });
                    delete newComments._id;
                    return newComments;
                });
                const processedPost = Object.assign(Object.assign({}, post.toJSON()), { postComments: processedPostComments, id: post._id });
                delete processedPost._id;
                return res.status(200).json(processedPost);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.removePost = async (req, res) => {
            try {
                const { id } = req.params;
                const post = await this.postDao.findOne({ uuid: id });
                const removedPost = await this.postDao.remove(post._id);
                if (!removedPost) {
                    return res.status(400).json({});
                }
                return res.status(200).json({ message: 'success' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.editPost = async (req, res) => {
            try {
                const { id } = req.params;
                const updatedPost = Object.assign({}, req.body);
                const post = await this.postDao.findOne({ uuid: id });
                const editedPost = await this.postDao.update(post._id, updatedPost);
                if (!editedPost) {
                    return res.status(400).json({});
                }
                return res.status(200).json({ message: 'success' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.likePost = async (req, res) => {
            try {
                let likedPost;
                let editedPost;
                let newPost;
                const { id } = req.params;
                const { userId } = req.query;
                const post = await this.postDao.findOne({ uuid: id });
                const isSameUser = post.whoLiked.some(item => {
                    return item === userId;
                });
                if (isSameUser) {
                    newPost = Object.assign(Object.assign({}, post.toJSON()), { whoLiked: post.whoLiked.filter(item => {
                            return item !== userId;
                        }) });
                    editedPost = Object.assign(Object.assign({}, newPost), { likes: newPost.whoLiked.length });
                    likedPost = await this.postDao.update(post._id, editedPost);
                    return res.status(200).json(likedPost);
                }
                newPost = Object.assign(Object.assign({}, post.toJSON()), { whoLiked: [...post.whoLiked, userId] });
                editedPost = Object.assign(Object.assign({}, newPost), { likes: newPost.whoLiked.length });
                likedPost = await this.postDao.update(post._id, editedPost);
                return res.status(200).json(likedPost);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.votePoll = async (req, res) => {
            try {
                const { id } = req.params;
                const post = await this.postDao.findOne({ uuid: id });
                let editedPost;
                let newPost;
                const isSameUser = post.poll.whoVoted.some(item => {
                    return item.userId === req.body.userId;
                });
                if (isSameUser) {
                    newPost = Object.assign(Object.assign({}, post.toJSON()), { poll: Object.assign(Object.assign({}, post.poll), { whoVoted: post.poll.whoVoted.filter(item => {
                                return item.userId !== req.body.userId;
                            }) }) });
                    await this.postDao.update(post._id, newPost);
                    return res.status(200).json({ message: 'Success' });
                }
                editedPost = Object.assign(Object.assign({}, post.toJSON()), { poll: Object.assign(Object.assign({}, post.poll), { whoVoted: [...post.poll.whoVoted, Object.assign({}, req.body)] }) });
                await this.postDao.update(post._id, editedPost);
                return res.status(200).json({ message: 'Success' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.postDao = postDao;
        this.postCommentDao = postCommentDao;
        this.userDao = userDao;
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostCommentController {
    constructor(postCommentDao, userDao) {
        this.getUsersPostComments = async (_req, res) => {
            try {
                const postsComment = await this.postCommentDao.find({});
                if (!postsComment) {
                    return res.status(400).json({ error: 'Posts not found' });
                }
                const processedPostComments = postsComment.map(post => {
                    const newPostComment = Object.assign(Object.assign({}, post.toJSON()), { id: post._id });
                    delete newPostComment._id;
                    return newPostComment;
                });
                return res.status(200).json(processedPostComments);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.addPostComment = async (req, res) => {
            try {
                const { userId } = req.query;
                const { postId } = req.query;
                if (!userId) {
                    return res.status(400).json({ error: "Something went wrong" });
                }
                const user = await this.userDao.findById(userId);
                const newPostComment = Object.assign(Object.assign({}, req.body), { userId,
                    postId, username: `${user.fName} ${user.lName}`, profileImg: user.profileImg });
                const postComment = await this.postCommentDao.add(newPostComment);
                return res.status(200).json(postComment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.removePostComment = async (req, res) => {
            try {
                const { id } = req.params;
                const removedPostComment = await this.postCommentDao.remove(id);
                if (!removedPostComment) {
                    return res.status(400).json({});
                }
                return res.status(200).json({ message: 'success' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.editPostComment = async (req, res) => {
            try {
                const { id } = req.params;
                const postComment = await this.postCommentDao.findById(id);
                if (!postComment) {
                    return res.status(400).json({});
                }
                const updatedPostComment = Object.assign({}, req.body);
                await this.postCommentDao.update(id, updatedPostComment);
                return res.status(200).json({ message: 'success' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.postCommentDao = postCommentDao;
        this.userDao = userDao;
    }
}
exports.PostCommentController = PostCommentController;
//# sourceMappingURL=postComment.js.map
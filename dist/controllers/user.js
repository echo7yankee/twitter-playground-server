"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userDao, postDao, postCommentDao) {
        this.getUserDetails = async (req, res) => {
            try {
                const { id } = req.params;
                const user = await this.userDao.findById(id);
                if (!user && !id) {
                    return res.status(400).json({});
                }
                const userDetails = {
                    id: user._id,
                    fName: user.fName,
                    lName: user.lName,
                    createdAt: user.createdAt,
                    profileImg: user.profileImg,
                    location: user.location,
                    bio: user.bio,
                    website: user.website,
                    age: user.age,
                    privacy: user.privacy
                };
                return res.status(200).json(userDetails);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.editUserDetails = async (req, res) => {
            try {
                const { id } = req.params;
                let newUser;
                let updatedUser;
                newUser = Object.assign({}, req.body);
                updatedUser = await this.userDao.update(id, newUser);
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.uploadUserImage = async (req, res) => {
            try {
                const { id } = req.params;
                let newUser;
                let updatedUser;
                if (req.files === null) {
                    return res.status(400).json({ error: 'No image uploaded' });
                }
                const file = req.files.file;
                file.mv(`${process.cwd()}/src/public/${file.name}`, async (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    newUser = Object.assign(Object.assign({}, req.body), { profileImg: file.name });
                    await this.postDao.updateAll(id, newUser.profileImg);
                    await this.postCommentDao.updateAll(id, newUser.profileImg);
                    updatedUser = await this.userDao.update(id, newUser);
                    return res.status(200).json(updatedUser);
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.userDao = userDao;
        this.postDao = postDao;
        this.postCommentDao = postCommentDao;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map
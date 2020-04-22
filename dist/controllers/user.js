"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFollowingUser_1 = require("../utils/getFollowingUser");
const getFollowerUser_1 = require("../utils/getFollowerUser");
const filterFollowingUser_1 = require("../utils/filterFollowingUser");
const filterFollowerUser_1 = require("../utils/filterFollowerUser");
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
                    social: Object.assign(Object.assign({}, user.social), { followingCount: user.social.following.length, followersCount: user.social.followers.length })
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
        this.followUser = async (req, res) => {
            try {
                const { ownerId, visitorId } = req.query;
                const user = await this.userDao.findById(ownerId);
                const visitorUser = await this.userDao.findById(visitorId);
                let newUser;
                let newVisitorUser;
                if (!user || !visitorUser) {
                    return res.status(400).json({ error: 'User not found' });
                }
                const sameFollowingUser = getFollowingUser_1.getFollowingUser(visitorId, user);
                const sameFollowerUser = getFollowerUser_1.getFollowerUser(ownerId, visitorUser);
                if (sameFollowingUser || sameFollowerUser) {
                    newUser = filterFollowingUser_1.filterFollowingUser(visitorId, user);
                    newVisitorUser = filterFollowerUser_1.filterFollowerUser(ownerId, visitorUser);
                    await this.userDao.update(ownerId, newUser);
                    await this.userDao.update(visitorId, newVisitorUser);
                    await this.postDao.updateAll({ userId: visitorId }, { user: newVisitorUser });
                    return res.status(200).json({ message: 'Success' });
                }
                newUser = Object.assign(Object.assign({}, user.toJSON()), { social: Object.assign(Object.assign({}, user.social), { following: [...user.social.following, visitorId] }) });
                newVisitorUser = Object.assign(Object.assign({}, visitorUser.toJSON()), { social: Object.assign(Object.assign({}, visitorUser.social), { followers: [...visitorUser.social.followers, ownerId] }) });
                await this.userDao.update(ownerId, newUser);
                await this.userDao.update(visitorId, newVisitorUser);
                await this.postDao.updateAll({ userId: visitorId }, { user: newVisitorUser });
                return res.status(200).json({ message: 'Success' });
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
                    await this.postDao.updateAll({ userId: id }, { profileImg: newUser.profileImg });
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
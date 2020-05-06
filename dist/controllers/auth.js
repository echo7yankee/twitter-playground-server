"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("../databaseStorage/models/Validation");
const bcryptjs_1 = require("../encoder/bcryptjs");
const jwt_1 = require("../token/jwt");
class AuthController {
    constructor(userDao) {
        this.createUser = async (req, res) => {
            try {
                const { error } = Validation_1.registerValidation(req.body);
                if (error) {
                    const errorMessage = error.details.pop().message;
                    const pureErrorMessage = errorMessage.replace(/\"/g, '');
                    return res.status(400).json({ error: pureErrorMessage });
                }
                const emailExists = await this.userDao.findOne({ email: req.body.email });
                if (emailExists) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                const { hashedPassword, hashedConfirmPassword } = await bcryptjs_1.encryptPassword(req.body.password, req.body.confirmPassword);
                const newUser = Object.assign(Object.assign({}, req.body), { username: `${req.body.fName} ${req.body.lName}`, location: '', website: '', bio: '', profileImg: '', social: {
                        following: [],
                        followingCount: 0,
                        followers: [],
                        followersCount: 0,
                        usersToMessage: [],
                        roomIds: [],
                    }, age: {
                        day: 'Select day',
                        month: 'Select month',
                        year: 'Select year',
                        privacy: {
                            monthAndDay: 'You follow each other',
                            privacyYear: 'Only you'
                        },
                    }, confirmPassword: hashedConfirmPassword, password: hashedPassword });
                const user = await this.userDao.add(newUser);
                const tokenParams = { id: user._id };
                const token = await jwt_1.createToken({ params: tokenParams });
                res.header('authToken', token);
                return res.status(200).json({ token, profileImg: user.profileImg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.loginUser = async (req, res) => {
            const { error } = Validation_1.loginValidation(req.body);
            if (error) {
                const errorMessage = error.details.pop().message;
                const pureErrorMessage = errorMessage.replace(/\"/g, '');
                return res.status(400).json({ error: pureErrorMessage });
            }
            try {
                const user = await this.userDao.findOne({
                    email: req.body.email,
                });
                if (!user) {
                    return res.status(400).json({ error: 'Email or password is wrong' });
                }
                const validPassword = await bcryptjs_1.comparePassword(req.body.password, user.password);
                if (!validPassword) {
                    return res.status(400).json({ error: 'Email or password is wrong' });
                }
                const tokenParams = { id: user._id };
                const token = await jwt_1.createToken({ params: tokenParams });
                await res.header('authToken', token);
                return res.status(200).json({ token, profileImg: user.profileImg });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.userDao = userDao;
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map
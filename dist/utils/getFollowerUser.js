"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowerUser = (id, user) => {
    const follower = user.social.followers.some((item) => {
        return item === id;
    });
    return follower;
};
//# sourceMappingURL=getFollowerUser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowingUser = (id, user) => {
    const following = user.social.following.some((item) => {
        return item === id;
    });
    return following;
};
//# sourceMappingURL=getFollowingUser.js.map
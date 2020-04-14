"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFollowingUser = (id, user) => {
    const followingUser = Object.assign(Object.assign({}, user.toJSON()), { social: Object.assign(Object.assign({}, user.social), { following: user.social.following.filter((follow) => follow !== id) }) });
    return followingUser;
};
//# sourceMappingURL=filterFollowingUser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFollowerUser = (id, user) => {
    const followerUser = Object.assign(Object.assign({}, user.toJSON()), { social: Object.assign(Object.assign({}, user.social), { followers: user.social.followers.filter((follow) => follow !== id) }) });
    return followerUser;
};
//# sourceMappingURL=filterFollowerUser.js.map
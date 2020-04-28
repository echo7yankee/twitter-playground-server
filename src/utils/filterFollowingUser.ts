export const filterFollowingUser = (id, user) => {
  const followingUser = {
    ...user.toJSON(),
    social: {
      ...user.social,
      followingCount: user.social.following.length - 1,
      following: user.social.following.filter((follow) => follow !== id),
    }
  }

  return followingUser;
};

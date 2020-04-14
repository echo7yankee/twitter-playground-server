export const filterFollowingUser = (id, user) => {
  const followingUser = {
    ...user.toJSON(),
    social: {
      ...user.social,
      following: user.social.following.filter((follow) => follow !== id),
    }
  }

  return followingUser;
};

export const filterFollowerUser = (id, user) => {
  const followerUser = {
    ...user.toJSON(),
    social: {
      ...user.social,
      followersCount: user.social.followers.length - 1,
      followers: user.social.followers.filter((follow) => follow !== id),
    }
  }

  return followerUser;
};

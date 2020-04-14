export const filterFollowerUser = (id, user) => {
  const followerUser = {
    ...user.toJSON(),
    social: {
      ...user.social,
      followers: user.social.followers.filter((follow) => follow !== id)
    }
  }

  return followerUser;
};

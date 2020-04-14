export const getFollowingUser = (id, user) => {
  const following = user.social.following.some((item) => {
    return item === id
  })

  return following;
}

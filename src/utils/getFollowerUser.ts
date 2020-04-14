export const getFollowerUser = (id, user) => {
  const follower = user.social.followers.some((item) => {
    return item === id
  })

  return follower;
}

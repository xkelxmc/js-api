export const secureUserParams = (user) => {
    const {
        password,
        tokens,
        dislikes,
        likes,
        ...userFields
    } = user.toObject();
    return userFields;
};

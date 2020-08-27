export const secureUserParams = (user) => {
    const { password, tokens, ...userFields } = user.toObject();
    return userFields;
};

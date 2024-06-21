const sessionIdToUser = new Map();

const setUser = (id, user) => {
    sessionIdToUser.set(id, user);
};
const getUser = (id) => {
    return sessionIdToUser.get(id);
}

module.exports = {
    setUser, getUser,
}
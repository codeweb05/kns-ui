// check if user logged in
export const isLogin = () => {
    if (localStorage.getItem('red_leaf_token')) {
        return true;
    }

    return false;
};

export const getName = () => {
    let user = localStorage.getItem('red_leaf_user');
    user = JSON.parse(user);
    if (user && user.firstName) {
        return `${user.firstName} ${user.lastName}`;
    }

    return;
};

export const isAdmin = () => {
    let user = localStorage.getItem('red_leaf_user');
    user = JSON.parse(user);
    return user.isAdmin;
};
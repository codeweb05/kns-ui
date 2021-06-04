
const isUser = (user) => user && user.role.includes("user");
const isAdmin = (user) =>  user && user.role.includes("admin");

export { isAdmin, isUser };

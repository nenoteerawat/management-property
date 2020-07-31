export const userService = {
  login,
  logout
};

function login(username, password) {
  var user = {
    firstName: "Teerawat",
    lastName: "Yaemsai",
    username: username,
    password: password
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

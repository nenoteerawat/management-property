import LoginProvider from "../_http_request/login_api";
export const userService = {
  login,
  logout
};

function login(username, password) {
  var login = new LoginProvider();
  var userToken = login.login(username, password);
  localStorage.setItem("userToken", JSON.stringify(userToken));
  return userToken;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("userToken");
}

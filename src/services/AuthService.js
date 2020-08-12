import axios from "axios";

const url =
  "http://localhost:8089/auth/realms/property/protocol/openid-connect/";

export default {
  login(credentials) {
    return axios
      .post(
        "http://localhost:8089/auth/realms/property/protocol/openid-connect/token/",
        credentials
      )
      .then(response => response.data)
      .catch(e => {
        this.errors.push(e);
      });
    // .get("http://localhost:8085/api/admin")
    // .then(response => console.log(response.data))
    // .catch(e => {
    //   this.errors.push(e);
    // })
  },
  signUp(credentials) {
    return axios
      .post(url + "sign-up/", credentials)
      .then(response => response.data);
  },
  getSecretContent() {
    return axios.get(url + "secret-route/").then(response => response.data);
  }
};

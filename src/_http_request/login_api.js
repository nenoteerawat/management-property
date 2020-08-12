import HttpRequest from "../_http_request/call_api";

export default class LoginProvider extends HttpRequest {
  constructor() {
    super("http://localhost:8089/auth/realms/property/protocol/openid-connect");
  }

  async login(username, password) {
    const { data } = await this.post(
      "/token",
      {
        data: {
          grant_type: "password",
          username: username,
          password: password,
          scope: "profile",
          client_id: "backend-property-service",
          client_secret: "1b5b1741-f8ae-491e-aa50-7c3b671fefa2"
        }
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return data;
  }
}

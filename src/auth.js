//this class is used to Authenticate the user into the app
class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("authenticated", true);
    }
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();

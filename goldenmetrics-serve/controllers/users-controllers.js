const jwt = require("jsonwebtoken");

const USER = [
  {
    email: "goldenmetrics@goldenmetrics.com",
    password: "golden"
  }
];

const login = (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  const identifiedUser = USER.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    const error = new Error(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
    return next(error);
  }

  let token;
  const secret = "supersecret_dont_share";
  try {
    if (rememberMe) {
      token = jwt.sign({ email: identifiedUser.email }, secret);
    } else {
      token = jwt.sign({ email: identifiedUser.email }, secret, {
        expiresIn: "1h"
      });
    }
  } catch (err) {
    const error = new Error("Logging in failed, please try again later.", 500);
    return next(error);
  }

  res.json({
    email: identifiedUser.email,
    token: token,
    rememberMe: rememberMe
  });
};

exports.login = login;

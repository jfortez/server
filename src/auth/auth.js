const jwt = require("jsonwebtoken");
const utils = require("./utils");
const pool = require("../database");
const sql = require("../models/UsuarioQueries");

exports.authorize = (req, res) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });
    pool.query(sql.viewUsername(), [user.usuario], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const data = {
          id: result[0].id,
          usuario: result[0].usuario,
          contraseña: result[0].contraseña,
          email: result[0].email,
          fecha_registro: result[0].fecha_registro,
          active: result[0].active,
        };
        // return 401 status if the userId does not match.
        if (user.id !== data.id) {
          return res.status(401).json({
            error: true,
            message: "Invalid user.",
          });
        }
        // get basic user details
        var userObj = utils.getCleanUser(data);
        return res.json({ user: userObj, token });
      }
    });
  });
};

exports.signin = (req, res) => {
  const user = req.body.usuario;
  const pwd = req.body.contraseña;
  try {
    pool.query(sql.loginUser(), [user, pwd], (err, response) => {
      if (err) throw err;
      if (!user || !pwd) {
        return res.status(400).json({
          error: true,
          message: "Username or Password is required.",
        });
      } else {
        if (response.length > 0) {
          const data = {
            id: response[0].id,
            usuario: response[0].usuario,
            contraseña: response[0].contraseña,
            email: response[0].email,
            fecha_registro: response[0].fecha_registro,
            active: response[0].active,
          };
          // generate token
          const token = utils.generateToken(data);
          // get basic user details
          const userObj = utils.getCleanUser(data);
          // return the token along with user details
          return res.json({ user: userObj, token });
        } else {
          return res.status(401).json({
            error: true,
            message: "Username or Password is wrong.",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.authorized = (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it." });
  res.send("Welcome to the Node.js Tutorial! - " + req.user.usuario);
};

exports.middleware = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
};

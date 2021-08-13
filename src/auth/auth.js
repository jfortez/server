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
  jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });
    const usuarioAutorizado = await pool.query(sql.viewUsername(), [user.usuario]);
    const usuarioAutorizadoPersonal = await pool.query(sql.viewUsernameByPersonal(), [
      user.usuario,
    ]);
    const usuarioAutorizadoOdontologo = await pool.query(sql.viewUsernameByOdontologo(), [
      user.usuario,
    ]);
    if (usuarioAutorizado.length > 0) {
      const data = {
        id: usuarioAutorizado[0].id,
        id_persona: usuarioAutorizadoOdontologo[0]
          ? usuarioAutorizadoOdontologo[0]?.id_Odontologo
          : usuarioAutorizadoPersonal[0]
          ? usuarioAutorizadoPersonal[0]?.id_Personal
          : null,
        role: usuarioAutorizadoOdontologo[0]
          ? usuarioAutorizadoOdontologo[0]?.previlegios
          : usuarioAutorizadoPersonal[0]
          ? usuarioAutorizadoPersonal[0]?.previlegios
          : "1",
        usuario: usuarioAutorizado[0].usuario,
        contraseña: usuarioAutorizado[0].contraseña,
        email: usuarioAutorizado[0].email,
        fecha_registro: usuarioAutorizado[0].fecha_registro,
        active: usuarioAutorizado[0].active,
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
};

exports.signin = async (req, res) => {
  const user = req.body.usuario;
  const pwd = req.body.contraseña;
  try {
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password is required.",
      });
    }
    const userLogin = await pool.query(sql.loginUser(), [user, pwd]);
    const userLoginPersonal = await pool.query(sql.loginUserPersonal(), [user, pwd]);
    const userLoginOdontologo = await pool.query(sql.loginUserOdontologo(), [user, pwd]);
    if (userLogin.length > 0) {
      const data = {
        id: userLogin[0].id,
        id_persona: userLoginOdontologo[0]
          ? userLoginOdontologo[0]?.id_Odontologo
          : userLoginPersonal[0]
          ? userLoginPersonal[0]?.id_Personal
          : null,
        role: userLoginOdontologo[0]
          ? userLoginOdontologo[0]?.previlegios
          : userLoginPersonal[0]
          ? userLoginPersonal[0]?.previlegios
          : 1,
        usuario: userLogin[0].usuario,
        contraseña: userLogin[0].contraseña,
        email: userLogin[0].email,
        fecha_registro: userLogin[0].fecha_registro,
        active: userLogin[0].active,
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
  } catch (error) {
    console.log(error);
  }
};

exports.authorized = (req, res) => {
  if (!req.user)
    return res.status(401).json({ success: false, message: "Invalid user to access it." });
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

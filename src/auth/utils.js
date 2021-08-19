var jwt = require("jsonwebtoken");

function generateToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;

  var u = {
    id: user.id,
    id_persona: user.id_persona,
    role: user.role,
    usuario: user.usuario,
    email: user.email,
    fecha_registro: user.fecha_registro,
    active: user.active,
  };

  return jwt.sign(u, process.env.JWT_SECRET || "ABCDEF$123", {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    id_persona: user.id_persona,
    role: user.role,
    usuario: user.usuario,
    email: user.email,
    fecha_registro: user.fecha_registro,
    active: user.active,
  };
}

module.exports = {
  generateToken,
  getCleanUser,
};

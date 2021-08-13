const pool = require("../database");
const sql = require("../models/UsuarioQueries");

exports.getUsuario = (req, res) => {
  try {
    pool.query(sql.getUsuarios(), (err, result) => {
      if (err) throw err;
      if (result) {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPersInUse = async (req, res) => {
  const users = await pool.query(sql.getPerUsersInUse());
  if (users.length > 0) {
    res.status(200).json(users);
  }
};
exports.getOdInUse = async (req, res) => {
  const users = await pool.query(sql.getOdUsersInUse());
  if (users.length > 0) {
    res.status(200).json(users);
  }
};

exports.getAllUsersInUse = async (req, res) => {
  const usersP = await pool.query(sql.getPerUsersInUse());
  const usersO = await pool.query(sql.getOdUsersInUse());
  if (usersP && usersO) {
    res.status(200).json({ personal: usersP, odontologos: usersO });
  }
};
exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  try {
    pool.query(sql.getUsuariosById(), [id], (err, result) => {
      if (err) throw err;
      if (result) {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.login = (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    pool.query(sql.loginUser(), [usuario, contraseña], (err, result) => {
      if (err) throw err;
      if (usuario === "" || contraseña === "") {
        res.json({
          message: "Username and password are required",
        });
      } else {
        if (result.length > 0) {
          if (result[0].usuario === usuario && result[0].contraseña === contraseña) {
            res.json({ message: "username and password are Correct", result });
          }
        } else {
          return res.json({
            message: "Username or Password are Incorrect",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.crearUsuario = (req, res) => {
  const { usuario, contraseña, previlegios } = req.body;
  const fecha_registro = new Date();
  const active = 1;
  const nuevoUsuario = { usuario, contraseña, previlegios, fecha_registro, active };
  try {
    pool.query(sql.ifUserExists(), [usuario], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json({ message: "el usuario ya existe" });
      } else {
        pool.query(sql.inserUsuario(), [nuevoUsuario], (error, results) => {
          if (error) throw error;
          if (results) {
            return res.json({
              message: "Se ha creado el usuario exitosamente",
              results,
            });
          }
        });
      }
    });
  } catch (error) {
    return res.json(error);
  }
};

exports.eliminarOdUsuario = async (req, res) => {
  const { id } = req.params;
  const setUserTo0 = await pool.query(sql.setOdontologoUserToNull(), [id]);
  if (setUserTo0) {
    const deleteUser = await pool.query(sql.deleteUsuario(), [id]);
    if (deleteUser) {
      return res.json({ message: "se ha eliminado el usuario" });
    }
  }
};
exports.eliminarPerUsuario = async (req, res) => {
  const { id } = req.params;
  const setUserTo0 = await pool.query(sql.setPersonalUserToNull(), [id]);
  if (setUserTo0) {
    const deleteUser = await pool.query(sql.deleteUsuario(), [id]);
    if (deleteUser) {
      return res.json({ message: "se ha eliminado el usuario" });
    }
  }
};

exports.actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const { usuario, contraseña, previlegios, active } = req.body;
  const fecha_registro = new Date();
  const actualizarUsuario = {
    usuario,
    contraseña,
    previlegios,
    fecha_registro,
    active,
  };
  try {
    pool.query(sql.getUsuariosById(), [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        pool.query(sql.updateUsuario(), [actualizarUsuario, id], (error, results) => {
          if (error) throw error;
          if (results) {
            return res.json({ message: "se ha actualizado el usuario" });
          }
        });
      } else {
        return res.json({
          message: "no existe el usuario para poder actualizar",
        });
      }
    });
  } catch (error) {
    return res.json(error);
  }
};

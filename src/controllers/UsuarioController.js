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
          if (
            result[0].usuario === usuario &&
            result[0].contraseña === contraseña
          ) {
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
  const { usuario, contraseña, email } = req.body;
  const fecha_registro = new Date().toLocaleDateString();
  const active = 1;
  const nuevoUsuario = { usuario, contraseña, email, fecha_registro, active };
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

exports.eliminarUsuario = (req, res) => {
  const id = req.params.id;
  const { usuario } = req.body;
  try {
    pool.query(sql.ifUserExists(), [usuario], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        pool.query(sql.deleteUsuario(), [id], (error, results) => {
          if (error) throw error;
          if (results) {
            return res.json({ message: "se ha eliminado el usuario" });
          }
        });
      } else {
        res.json({
          message: "el usuario no se puede eliminar porque no existe",
        });
      }
    });
  } catch (error) {
    return res.json(error);
  }
};

exports.actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const { usuario, contraseña, email, active } = req.body;
  const fecha_registro = new Date().toLocaleDateString();
  const actualizarUsuario = {
    usuario,
    contraseña,
    email,
    fecha_registro,
    active,
  };
  try {
    pool.query(sql.getUsuariosById(), [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        pool.query(
          sql.updateUsuario(),
          [actualizarUsuario, id],
          (error, results) => {
            if (error) throw error;
            if (results) {
              return res.json({ message: "se ha actualizado el usuario" });
            }
          }
        );
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

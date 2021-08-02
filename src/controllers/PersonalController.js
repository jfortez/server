const pool = require("../database");
const sql = require("../models/PersonalQueries");
const externalSql = require("../models/UsuarioQueries");

exports.listPersonal = async (req, res) => {
  await pool.query(sql.getPersonal(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};

exports.listPersonalCedula = async (req, res) => {
  await pool.query(sql.getPersonalCedula(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};
exports.getPersonalById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getPersonalById(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};
exports.getPersonalByCedula = async (req, res) => {
  const { cedula } = req.body;
  console.log(req.body);
  await pool.query(sql.ifPersonalExists(), [cedula], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};
exports.setUser = async (req, res) => {
  const fecha_registro = new Date();
  const active = 1;
  const { usuario, contraseña, previlegios, cedula } = req.body;
  const nuevoUsuario = { usuario, contraseña, previlegios, fecha_registro, active };
  //verificamos si existen usuarios que  ya se encuentra registrado bajo el  numero de cedula
  await pool.query(sql.ifPersonalExists(), [cedula], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.verifyIfUserAlreadyExists(), [cedula], async (err, response) => {
        if (err) throw err;
        if (response.length > 0) {
          res.status(400).json({ message: "Ya existe usuario para la persona" });
        } else {
          await pool.query(externalSql.inserUsuario(), [nuevoUsuario], async (err, response) => {
            if (err) throw err;
            if (response) {
              const id_Usr = response.insertId;
              await pool.query(sql.updateIdUsuario(), [id_Usr, cedula], (err, response) => {
                if (err) throw err;
                if (response) {
                  res.status(200).json({ message: "Usuario añadido correctamente" });
                } else {
                  res.status(400).json({ message: "hubo un error al añadir el usuario " });
                }
              });
            } else {
              res.status(400).json({ message: "error 1 " });
            }
          });
        }
      });
    } else {
      res.status(400).json({ message: "El Personal no existe " });
    }
  });
};
exports.crearPersonal = async (req, res) => {
  const fecha_registro = new Date();
  const active = 1;
  const {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Cargo,
    id_Usuario,
  } = req.body;
  const nuevoPersonal = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Cargo,
    fecha_registro,
    active,
    id_Usuario,
  };
  await pool.query(sql.ifPersonalExists(), [cedula], async (err, response) => {
    if (err) throw err;
    if (response.lenght > 0) {
      res.status(400).json({ message: "el item ya existe, no se puede duplicar" });
    } else {
      await pool.query(sql.insertPersonal(), [nuevoPersonal], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item creado correctamente" });
        }
      });
    }
  });
};

exports.eliminarPersonal = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getPersonalById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deletePersonal(), [id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item Eliminado correctamente" });
        }
      });
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};

exports.actualizarPersonal = async (req, res) => {
  const { id } = req.params;
  const fecha_registro = new Date();
  const {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Cargo,
    active,
    id_Usuario,
  } = req.body;
  const nuevoPersonal = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Cargo,
    fecha_registro,
    active,
    id_Usuario,
  };
  await pool.query(sql.getPersonalById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.updatePersonal(), [nuevoPersonal, id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item Actualizado correctamente" });
        }
      });
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};

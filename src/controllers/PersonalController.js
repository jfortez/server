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
  //Verificamos si hay un personal registrado bajo el numero de cedula
  await pool.query(sql.ifPersonalExists(), [cedula], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      //verificamos si existen usuarios que  ya se encuentra registrado bajo el  numero de cedula
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

exports.pruebaCrear = async (req, res) => {
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
  if (
    cedula === undefined ||
    cedula === "" ||
    nombres === "" ||
    nombres === undefined ||
    apellidos === "" ||
    apellidos === undefined ||
    direccion === "" ||
    direccion === undefined ||
    ciudad === "" ||
    ciudad === undefined
  ) {
    return res.status(400).json({ message: "los campos no pueden ser vacios" });
  }
  //prmero identificar si ya existe el numero de cedula de forma global en la tabla PERSONAS
  const ifCedulaExists = await pool.query(sql.verificarEnTablaPersonas(), [cedula]);
  if (ifCedulaExists.length > 0) {
    res.json({ message: "cedula ya existe" });
  } else {
    //en caso de que no existe cedula de manera global, se procede a crear una fila a la tabla PERSONAL
    const nuevoPersonal = {
      id_Cargo,
      fecha_registro,
      active,
      id_Usuario,
    };
    const personal = await pool.query(sql.insertPersonal(), [nuevoPersonal]);
    const id_Personal = personal.insertId; //esta variable mantiene la ultima ID de la fila creada de la tabla PERSONAL
    //una vez creada, se debe almacenar los datos en la tabla PERSONAS para verificar en un futuro que no se repita
    //verificamos que si ocurrió el proceso
    if (personal) {
      //procedemos a almacenar la informacion de forma global en tabla PERSONAS
      const personasData = {
        cedula,
        nombres,
        apellidos,
        telefono,
        direccion,
        ciudad,
        fecha_nacimiento,
        email,
        id_Personal,
      };
      const personas = await pool.query(sql.almacenarDatos(), [personasData]);
      if (personas) {
        res.status(200).json({ message: "se ha creado correctamente" });
      }
    }
  }
};

exports.pruebaActualizar = async (req, res) => {
  const { id } = req.params;
  const {
    cedula,
    nombres,
    apellidos,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Cargo,
    id_Usuario,
  } = req.body;
  let updatePersonal = {
    cedula,
    nombres,
    apellidos,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    id_Cargo,
    id_Usuario,
  };
  if (telefono === undefined) {
    delete updatePersonal.telefono;
  }
  if (email === undefined) {
    delete updatePersonal.email;
  }
  if (fecha_nacimiento === undefined) {
    delete updatePersonal.fecha_nacimiento;
  }
  if (id_Usuario === undefined) {
    delete updatePersonal.id_Usuario;
  }
  if (id_Cargo === undefined) {
    delete updatePersonal.id_Cargo;
  }
  //primero verificamos que exista el Id en la tabla Personas
  const persona = await pool.query(sql.verificarById(), [id]);
  if (persona.length > 0) {
    //actualizamos
    const personal = await pool.query(sql.newUpdate(), [updatePersonal, id]);
    if (personal) {
      res.status(200).json({ message: "item Actualizado correctamente" });
    }
  } else {
    res.status(400).json({ message: "el item no existe" });
  }
};

exports.pruebaEliminar = async (req, res) => {
  const { id } = req.params;
  //verificar si existe el id
  const verify = await pool.query(sql.verificarById(), [id]);
  if (verify.length > 0) {
    //eliminar la fila existente de la tabla PERSONAS
    const persona = await pool.query(sql.deletePersona(), [id]);
    if (persona) {
      //eliminar la fila de la tabla PERSONAL
      const personal = await pool.query(sql.deletePersonal(), [id]);
      if (personal) {
        res.status(200).json({ message: "item Eliminado correctamente" });
      }
    }
  } else {
    res.status(400).json({ message: "el item no existe" });
  }
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

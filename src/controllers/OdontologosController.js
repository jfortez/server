const pool = require("../database");
const sql = require("../models/OdontologoQueries");
const externalSql = require("../models/UsuarioQueries");

exports.getOdontologo = async (req, res) => {
  const list = await pool.query(sql.getOdontologos());
  if (list.length > 0) {
    res.status(200).json(list);
  }
  res.end();
};

exports.getOdontologoByCedula = async (req, res) => {
  const { cedula } = req.body;
  const odByCed = await pool.query(sql.getOdontologoByCed(), [cedula]);
  if (odByCed.length > 0) {
    return res.status(200).json(odByCed);
  } else {
    return res.json({ message: "no existe Odontologo" });
  }
};

exports.getOdontologoById = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(sql.verificarById(), [id]);
  if (data.length > 0) {
    res.status(200).json(data);
  }
};
exports.setUser = async (req, res) => {
  const fecha_registro = new Date();
  const active = 1;
  const { usuario, contraseña, previlegios, cedula } = req.body;
  const nuevoUsuario = { usuario, contraseña, previlegios, fecha_registro, active };
  //verificamos que exista una cedula de manera global
  const userExiste = await pool.query(externalSql.ifUserExists(), [usuario]);
  if (userExiste.length > 0) {
    return res.status(400).json({ message: "El usuario es duplicado, ya existe" });
  }

  const cedulaExiste = await pool.query(sql.verificarEnTablaPersonas(), [cedula]);
  if (cedulaExiste.length > 0) {
    //verificamos si existen usuarios que  ya se encuentra registrado bajo el  numero de cedula
    const verifyIfUserInUse = await pool.query(sql.verifyIfUserAlreadyExists(), [cedula]);
    if (verifyIfUserInUse.length > 0) {
      res.status(400).json({ message: "Ya existe usuario para la persona" });
    } else {
      //si no existe un usuario en uso, procedemos a crear usuario para crear usuario
      const usuario = await pool.query(externalSql.inserUsuario(), [nuevoUsuario]);
      if (usuario) {
        //almacenamos el ultimo id del usuario creado
        const id_Usr = usuario.insertId;
        //procedemos a modificar la table y añadir el ultimo usuario creado para la tabla personal
        const usuarioAñadido = await pool.query(sql.newUpdateIdUsuario(), [id_Usr, cedula]);
        if (usuarioAñadido) {
          res.status(200).json({ message: "Usuario añadido correctamente" });
        } else {
          res.status(400).json({ message: "hubo un error al añadir el usuario " });
        }
      }
    }
  } else {
    res.status(400).json({ message: "No existe un dato bajo la Cedula ingresada " });
  }
};
exports.createOdontologo = async (req, res) => {
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
    res.status(400).json({ message: "cedula ya existe" });
  } else {
    //en caso de que no existe cedula de manera global, se procede a crear una fila a la tabla PERSONAL
    const nuevoOdontologo = {
      fecha_registro,
      active,
      id_Usuario,
    };
    const odontologo = await pool.query(sql.insertOdontologos(), [nuevoOdontologo]);
    const id_Odontologo = odontologo.insertId; //esta variable mantiene la ultima ID de la fila creada de la tabla PERSONAL
    //una vez creada, se debe almacenar los datos en la tabla PERSONAS para verificar en un futuro que no se repita
    //verificamos que si ocurrió el proceso
    if (odontologo) {
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
        id_Odontologo,
      };
      const personas = await pool.query(sql.almacenarDatos(), [personasData]);
      if (personas) {
        res.status(200).json({ message: "se ha creado correctamente" });
      }
    }
  }
};

exports.updateOdolontogo = async (req, res) => {
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
    active,
    id_Usuario,
  } = req.body;
  let updateOdontologo = {
    cedula,
    nombres,
    apellidos,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    active,
    id_Usuario,
  };
  if (telefono === undefined) {
    delete updateOdontologo.telefono;
  }
  if (email === undefined) {
    delete updateOdontologo.email;
  }
  if (fecha_nacimiento === undefined) {
    delete updateOdontologo.fecha_nacimiento;
  }
  if (id_Usuario === undefined) {
    delete updateOdontologo.id_Usuario;
  }
  if (active === undefined) {
    delete updateOdontologo.active;
  }
  //primero verificamos que exista el Id en la tabla Personas
  const persona = await pool.query(sql.verificarById(), [id]);
  if (persona.length > 0) {
    //actualizamos
    const odontologo = await pool.query(sql.newUpdate(), [updateOdontologo, id]);
    if (odontologo) {
      res.status(200).json({ message: "item Actualizado correctamente" });
    }
  } else {
    res.status(400).json({ message: "el item no existe" });
  }
};

exports.deleteOdolontogo = async (req, res) => {
  const { id } = req.params;
  //verificar si existe el id
  const verify = await pool.query(sql.verificarById(), [id]);
  if (verify.length > 0) {
    //eliminar la fila existente de la tabla PERSONAS
    const persona = await pool.query(sql.deletePersona(), [id]);
    if (persona) {
      //eliminar la fila de la tabla PERSONAL
      const odontologo = await pool.query(sql.deleteOdontologos(), [id]);
      if (odontologo) {
        res.status(200).json({ message: "item Eliminado correctamente" });
      }
    }
  } else {
    res.status(400).json({ message: "el item no existe" });
  }
};

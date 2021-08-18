const pool = require("../database");
const sql = require("../models/PersonalQueries");
const externalSql = require("../models/UsuarioQueries");

exports.getPersonal = async (req, res) => {
  const list = await pool.query(sql.listPersonal());
  if (list.length > 0) {
    res.status(200).json(list);
  }
  res.end();
};

exports.getPersonalById = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(sql.verificarById(), [id]);
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "El Personal no existe " });
  }
  res.end();
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
  const cedulaExiste = await pool.query(sql.verify2(), [cedula]);
  if (cedulaExiste.length > 0) {
    return res.json({ message: "cedula ya existe", cedulaExiste });
  }
  const ifCiExists = await pool.query(sql.verificarEnTablaPersonas(), [cedula]);
  if (ifCiExists.length > 0) {
    return res.json({ message: "Dato ya existe" });
  }
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
};
exports.bajaPersonal = async (req, res) => {
  const { id } = req.params;
  const baja = await pool.query(sql.bajaPersonal(), [id]);
  if (baja) {
    res.status(200).json({ message: "se dio de baja al perfil correctamente" });
  }
  res.end();
};
exports.pruebaActualizar = async (req, res) => {
  const { id } = req.params;
  const active = 1;
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
    active,
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
  if (active === undefined) {
    delete updatePersonal.active;
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

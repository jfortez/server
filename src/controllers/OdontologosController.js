const pool = require("../database");
const sql = require("../models/OdontologoQueries");

exports.listOdontologo = async (req, res) => {
  await pool.query(sql.getOdontologos(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};

exports.getOdontologoById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getOdontologosById(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};

exports.getOdontologoByCedula = async (req, res) => {
  const { cedula } = req.body;
  await pool.query(sql.ifOdontologoExists(), [cedula], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "el item no existe" });
    }
  });
};
exports.crearOdontologo = async (req, res) => {
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
  const nuevoOdontologo = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    fecha_registro,
    active,
    id_Usuario,
  };
  await pool.query(sql.ifOdontologoExists(), [cedula], async (err, response) => {
    if (err) throw err;
    if (response.lenght > 0) {
      res.status(400).json({ message: "el item ya existe, no se puede duplicar" });
    } else {
      await pool.query(sql.insertOdontologos(), [nuevoOdontologo], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "item creado correctamente" });
        }
      });
    }
  });
};

exports.eliminarOdontologo = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getOdontologosById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.deleteOdontologos(), [id], (err, response) => {
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

exports.actualizarOdontologo = async (req, res) => {
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
    active,
    id_Usuario,
  } = req.body;
  const nuevoOdontologo = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    email,
    fecha_registro,
    active,
    id_Usuario,
  };
  await pool.query(sql.getOdontologosById(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      await pool.query(sql.updateOdontologos(), [nuevoOdontologo, id], (err, response) => {
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

exports.pruebaById = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(sql.verificarById(), [id]);
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "El Personal no existe " });
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

exports.pruebaEliminar = async (req, res) => {
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

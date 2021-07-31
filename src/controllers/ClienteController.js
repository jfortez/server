const pool = require("../database");
const sql = require("../models/ClienteQueries");

exports.listCliente = async (req, res) => {
  await pool.query(sql.getClientes(), (err, response) => {
    if (err) throw err;
    if (response) {
      res.status(200).json(response);
    }
  });
};

exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  await pool.query(sql.getClienteId(), [id], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Cliente no existe" });
    }
  });
};

exports.crearCliente = async (req, res) => {
  const fecha_registro = new Date();
  const active = 1;
  const { ruc, nombres, apellidos, email, telefono, direccion, ciudad } = req.body;
  const nuevoCliente = {
    ruc,
    nombres,
    apellidos,
    email,
    telefono,
    direccion,
    ciudad,
    fecha_registro,
    active,
  };
  // Verificar si el cliente existe y proceder crear el cliente
  await pool.query(sql.ifClientExists(), [ruc], async (err, response) => {
    if (err) throw err;
    //SI el cliente existe
    if (response.length > 0) {
      res.status(500).json({ message: "Cliente ya se encuentra registrado" });
    } else {
      //cliente no existe
      await pool.query(sql.insertClientes(), [nuevoCliente], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "Cliente creado exitosamente" });
        } else {
          res.status(500).json({ message: "hubo un error al crear el cliente" });
        }
      });
    }
  });
};

exports.eliminarCliente = async (req, res) => {
  const { id } = req.params;
  //verificar si dicho id existe
  await pool.query(sql.getClienteId(), [id], async (err, response) => {
    if (err) throw err;
    //si existe el id, procede a eliminarlo
    if (response.length > 0) {
      await pool.query(sql.deleteCliente(), [id], (err, response) => {
        if (err) throw err;
        if (response) {
          res.status(200).json({ message: "se eliminó el cliente exitosamente" });
        } else {
          res.status(500).json({ message: "hubo un error al eliminar el cliente" });
        }
      });
    } else {
      res.status(500).json({ message: "el Cliente no existe" });
    }
  });
};

exports.actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const fecha_registro = new Date();
  const { ruc, nombres, apellidos, email, telefono, direccion, ciudad, active } = req.body;
  const nuevoCliente = {
    ruc,
    nombres,
    apellidos,
    email,
    telefono,
    direccion,
    ciudad,
    fecha_registro,
    active,
  };
  // verificar que el id exista
  await pool.query(sql.getClienteId(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      // Verificar que el numero de documento no sea el mismo de
      await pool.query(sql.ifClientExists(), [ruc], async (err, response) => {
        if (err) throw err;
        if (response.length > 0) {
          //Existe un cliente con el mismo num de documento
          res.status(500).json({
            message: "El Numero de documento que se desea actualizar ya existe en la base de datos",
          });
        } else {
          //no existe un cliente repetido, se puede proseguir
          //proceder a actualizar el cliente
          await pool.query(sql.updateCliente(), [nuevoCliente, id], (err, response) => {
            if (err) throw err;
            if (response) {
              res.status(200).json({ message: "se actualizó el cliente exitosamente" });
            } else {
              res.status(500).json({
                message: "hubo un a error al actualizar el cliente",
              });
            }
          });
        }
      });
    } else {
      res.status(500).json({ message: "el Cliente no existe" });
    }
  });
};

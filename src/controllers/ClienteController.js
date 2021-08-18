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

exports.getClienteByRUC = async (req, res) => {
  const { ruc } = req.body;
  await pool.query(sql.ifClientExists(), [ruc], (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.json({ message: "Cliente no existe" });
    }
  });
};
exports.bajaCliente = async (req, res) => {
  const { id } = req.params;
  const baja = await pool.query(sql.bajaCliente(), [id]);
  if (baja) {
    res.status(200).json({ message: "cliente dado de baja" });
  }
  res.end();
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
      return res.json({ message: "el ruc ya existe", response });
    }
    //cliente no existe
    await pool.query(sql.insertClientes(), [nuevoCliente], (err, response) => {
      if (err) throw err;
      if (response) {
        res.status(200).json({ message: "Cliente creado exitosamente" });
      } else {
        res.status(500).json({ message: "hubo un error al crear el cliente" });
      }
    });
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
  const active = 1;
  const { ruc, nombres, apellidos, email, telefono, direccion, ciudad } = req.body;
  let nuevoCliente = {
    ruc,
    nombres,
    apellidos,
    email,
    telefono,
    direccion,
    ciudad,
    active,
  };
  if (active === undefined) {
    delete nuevoCliente.active;
  }
  // verificar que el id exista
  await pool.query(sql.getClienteId(), [id], async (err, response) => {
    if (err) throw err;
    if (response.length > 0) {
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
};

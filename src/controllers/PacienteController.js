const pool = require("../database");
const sql = require("../models/PacienteQueries");

exports.listPacientes = async (req, res) => {
  await pool.query(sql.getPacientes(), (err, result) => {
    if (err) throw err;
    if (result) {
      return res.json(result);
    }
    res.end();
  });
};
exports.listPacientesById = (req, res) => {
  const { id } = req.params;
  try {
    pool.query(sql.getPacienteById(), [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.json({ message: "no existe paciente" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
exports.listPacietnesByCedula = async (req, res) => {
  const { cedula } = req.body;
  const paciente = await pool.query(sql.ifPacienteExiste(), [cedula]);
  if (paciente.length > 0) {
    return res.status(200).json(paciente);
  } else {
    return res.json({ message: "no existe paciente" });
  }
};
exports.crearPaciente = (req, res) => {
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
    edad,
    genero,
  } = req.body;
  const nuevoPaciente = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    edad,
    genero,
    fecha_registro,
    active,
  };
  try {
    pool.query(sql.ifPacienteExiste(), [cedula], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.json({
          message: "dato ya existe",
          result,
        });
      }
      pool.query(sql.insertPacientes(), [nuevoPaciente], (err, result) => {
        if (err) throw err;
        if (result) {
          return res.status(200).json({ message: "Paciente creado exitosamente" });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.bajaPacientes = async (req, res) => {
  const { id } = req.params;
  const paciente = await pool.query(sql.bajaPaciente(), [id]);
  if (paciente) {
    res.status(200).json({ message: "se dió de baja los datos correctamente" });
  }
  res.end();
};
exports.eliminarPaciente = (req, res) => {
  const { id } = req.params;
  try {
    pool.query(sql.getPacienteById(), [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        pool.query(sql.deletePacientes(), [id], (err, result) => {
          if (err) throw err;
          if (result) {
            return res.status(200).json({
              message: "Paciente eliminado satisfatoriamente",
              result,
            });
          }
        });
      } else {
        res.json({
          message: "Paciente no existe",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.actualizarPaciente = (req, res) => {
  const { id } = req.params;
  const active = 1;
  const {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    edad,
    genero,
  } = req.body;
  const nuevoPaciente = {
    nombres,
    apellidos,
    cedula,
    telefono,
    direccion,
    ciudad,
    fecha_nacimiento,
    edad,
    genero,
    active,
  };
  try {
    pool.query(sql.getPacienteById(), [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        pool.query(sql.updatePacientes(), [nuevoPaciente, id], (err, result) => {
          if (err) throw err;
          if (result) {
            return res.status(200).json({
              message: "paciente actualizado correctamente",
            });
          }
        });
      } else {
        return res.json({ message: "paciente no existe" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

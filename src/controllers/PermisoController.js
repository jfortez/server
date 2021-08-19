const pool = require("../database");
const sql = require("../models/PermisosQueries");

exports.getPermisos = async (req, res) => {
  const permiso = await pool.query(sql.getPermiso());
  if (permiso) {
    res.status(200).json(permiso);
  }
  res.end();
};
exports.createPermisos = async (req, res) => {
  const active = 1;
  const { id_Paciente, id_Usuario, id_Odontologo, fecha_permiso, motivo_permiso, dias_permiso } =
    req.body;
  const nuevo = {
    id_Paciente,
    id_Usuario,
    id_Odontologo,
    fecha_permiso,
    motivo_permiso,
    dias_permiso,
    active,
  };
  const permiso = await pool.query(sql.insertPermiso(), [nuevo]);
  if (permiso) {
    res.status(200).json({ message: "se ha generado correctamente" });
  }
  res.end();
};

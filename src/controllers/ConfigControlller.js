const pool = require("../database");
const sql = require("../models/ConfigQueries");

exports.getNumValues = async (req, res) => {
  const numVenta = await pool.query(sql.getValues());
  if (numVenta) {
    res.status(200).json(numVenta);
  }
};
exports.updateValues = async (req, res) => {
  const { num_venta, num_recibo } = req.body;
  let updt = { num_venta, num_recibo };
  if (num_recibo === undefined) {
    delete updt.num_recibo;
  }
  if (num_venta === undefined) {
    delete updt.num_venta;
  }
  const newNumVenta = await pool.query(sql.updateValues(), [updt]);
  if (newNumVenta) {
    res.status(200).json({ message: "se actualizó las configuraciones" });
  }
};

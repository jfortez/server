exports.getVentas = () => {
  return "select * from ventas";
};
exports.getVentasById = () => {
  return "SELECT * FROM ventas WHERE id=?";
};
exports.getVentasByNumVenta = () => {
  return "SELECT * FROM ventas WHERE num_venta=?";
};
exports.insertVentas = () => {
  return "INSERT INTO ventas SET ?";
};
exports.deleteVentas = () => {
  return "DELETE FROM ventas WHERE id=?";
};
exports.updateVentas = () => {
  return "UPDATE ventas SET ? WHERE id=?";
};
// -----------Reporte de Ventas
exports.getReporteVentas = () => {
  return "SELECT v.id AS idVenta, v.num_venta,v.num_recibo, v.fecha, v.cantidad,  v.total,v.importe, v.devolucion, v.id_Cliente, cl.ruc, cl.nombres, cl.apellidos, cl.telefono,cl.direccion, cl.ciudad, cl.email, v.id_Usuario, u.usuario FROM ventas v, clientes cl, usuarios u WHERE cl.id=v.id_Cliente AND u.id=v.id_Usuario";
};
exports.getreporteDetalleVentas = () => {
  return "SELECT dtv.id AS idDetalleVenta, dtv.id_Venta,v.num_venta,v.num_recibo, v.fecha,v.importe, v.devolucion, dtv.id_Producto, p.cod_producto, p.nombre, p.descripcion, p.id_categoria, cprod.nombre AS cat_nombre, dtv.precio, dtv.cantidad, dtv.total, v.id_Cliente, cl.ruc, cl.nombres, cl.apellidos, v.id_Usuario, u.usuario  FROM detalle_venta dtv, productos p, ventas v, clientes cl, usuarios u, categoria_producto cprod WHERE dtv.id_Venta=v.id AND dtv.id_Producto=p.id AND v.id_Cliente=cl.id AND v.id_Usuario=u.id AND p.id_categoria=cprod.id AND v.id=?";
};

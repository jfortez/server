exports.getCompras = () => {
  return "SELECT c.id, c.id_proveedor, p.ruc, p.nombre, c.num_factura,c.fecha, c.cantidad, c.total FROM compras c, proveedores p WHERE c.id_proveedor=p.id AND c.active=1";
};
exports.insertCompras = () => {
  return "INSERT INTO compras SET ?";
};
exports.updateCompras = () => {
  return "UPDATE compras SET ? WHERE id=?";
};
exports.bajaCompras = () => {
  return "UPDATE compras SET active=0 where id=?";
};

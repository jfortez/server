exports.getDetalleCompras = () => {
  return "SELECT dc.id AS idDetCompra, dc.id_compra, c.id_proveedor, pv.ruc, pv.nombre AS nombre_proveedor,c.num_factura, c.fecha, dc.id_producto, p.cod_producto, p.nombre AS nombre_producto, dc.cantidad, dc.precio, dc.total, c.cantidad AS total_cantidad, c.total AS total_compra FROM detalle_compra dc, productos p, compras c, proveedores pv WHERE dc.id_compra=c.id AND dc.id_producto=p.id AND c.id_proveedor=pv.id";
};
exports.getDetalleComprasbyIdCompra = () => {
  return "SELECT dc.id AS idDetCompra, dc.id_compra, c.id_proveedor, pv.ruc, pv.nombre AS nombre_proveedor,c.num_factura, c.fecha, dc.id_producto, p.cod_producto, p.nombre AS nombre_producto, dc.cantidad, dc.precio, dc.total, c.cantidad AS total_cantidad, c.total AS total_compra FROM detalle_compra dc, productos p, compras c, proveedores pv WHERE dc.id_compra=c.id AND dc.id_producto=p.id AND c.id_proveedor=pv.id AND id_compra=?";
};
exports.insertDetalleCompras = () => {
  return "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio, total) VALUES ?";
};

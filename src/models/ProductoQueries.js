exports.getProductos = () => {
  return "select * from productos";
};
exports.getProductos2 = () => {
  return "SELECT p.*, ctp.nombre AS categoria FROM productos p, categoria_producto ctp WHERE p.id_categoria=ctp.id";
};
exports.getProductoById = () => {
  return "SELECT * FROM productos WHERE id=?";
};
exports.getProductoByCod = () => {
  return "SELECT * FROM productos WHERE cod_producto=?";
};
exports.insertProductos = () => {
  return "INSERT INTO productos SET ?";
};
exports.deleteProductos = () => {
  return "DELETE FROM productos WHERE id=?";
};
exports.updateProductos = () => {
  return "UPDATE productos SET ? WHERE id=?";
};
exports.updateCantidad = () => {
  return "INSERT INTO productos (id, cantidad) VALUES  ? AS updtcant ON DUPLICATE KEY UPDATE cantidad=updtcant.cantidad";
};
exports.updateByCompras = () => {
  return "INSERT INTO productos (id,costo,precio, cantidad) VALUES  ? AS updtcompra ON DUPLICATE KEY UPDATE costo=updtcompra.costo, precio=updtcompra.precio, cantidad=updtcompra.cantidad";
};
exports.multipleInsertProductos = () => {
  return "INSERT INTO productos (cod_producto,nombre,descripcion,cantidad,costo,precio,id_categoria,active) VALUES ?";
};

exports.getProductos = () => {
  return "select * from productos";
};
exports.getProductos2 = () => {
  return "SELECT p.*, ctp.nombre AS categoria FROM productos p, categoria_producto ctp WHERE p.id_categoria=ctp.id";
};
exports.getProductoById = () => {
  return "SELECT * FROM productos WHERE id=?";
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

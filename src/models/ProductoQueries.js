exports.getProductos = () => {
  return "select * from productos";
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

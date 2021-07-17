exports.getCategoria = () => {
  return "select * from categoria_producto";
};
exports.getCategoriabyId = () => {
  return "SELECT * FROM categoria_producto WHERE id=?";
};
exports.insertCategoria = () => {
  return "INSERT INTO categoria_producto SET ?";
};
exports.deleteCategoria = () => {
  return "DELETE FROM categoria_producto WHERE id=?";
};
exports.updateCategoria = () => {
  return "UPDATE categoria_producto SET ? WHERE id=?";
};

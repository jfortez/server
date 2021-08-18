exports.getCategoria = () => {
  return "select * from categoria_producto where active=1";
};
exports.getCategoriabyId = () => {
  return "SELECT * FROM categoria_producto WHERE id=?";
};
exports.bajaCategoria = () => {
  return "UPDATE categoria_producto SET active=0 WHERE categoria_producto.id=?";
};
exports.sameCategoria = () => {
  return "SELECT * FROM categoria_producto WHERE categoria_producto.nombre=?";
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

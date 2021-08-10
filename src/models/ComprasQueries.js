exports.getCompras = () => {
  return "SELECT * from compras";
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

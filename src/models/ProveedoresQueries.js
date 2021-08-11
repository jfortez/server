exports.getProveedores = () => {
  return "SELECT * from proveedores WHERE active=1";
};
exports.getProveedoresById = () => {
  return "SELECT * from proveedores WHERE active=1 and id=?";
};
exports.getProveedoresByRUC = () => {
  return "SELECT * from proveedores WHERE ruc=?";
};
exports.getProveedoresByRUCandActive = () => {
  return "SELECT * from proveedores WHERE active=1 AND ruc=?";
};
exports.insertProveedor = () => {
  return "INSERT INTO proveedores SET ?";
};
exports.updateProveedor = () => {
  return "UPDATE proveedores SET ? WHERE id=?";
};
exports.deleteProveedor = () => {
  return "DELETE FROM proveedores WHERE id=?";
};
exports.downProveedor = () => {
  return "UPDATE proveedores SET active=0 where id=?";
};

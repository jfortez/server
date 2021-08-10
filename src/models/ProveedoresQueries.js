exports.getProveedores = () => {
  return "SELECT * from proveedores";
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
  return "UPDATE proveedores active=0 where id=?";
};

exports.getClientes = () => {
  return "select * from clientes";
};
exports.ifClientExists = () => {
  return "SELECT * FROM clientes WHERE num_documento=?";
};
exports.getClienteId = () => {
  return "SELECT * FROM clientes WHERE id=?";
};
exports.insertClientes = () => {
  return "INSERT INTO clientes SET ?";
};
exports.deleteCliente = () => {
  return "DELETE FROM clientes WHERE id=?";
};
exports.updateCliente = () => {
  return "UPDATE clientes SET ? WHERE id=?";
};

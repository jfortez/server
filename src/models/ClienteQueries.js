exports.getClientes = () => {
  return "select * from clientes where active=1";
};
exports.ifClientExists = () => {
  return "SELECT * FROM clientes WHERE ruc=?";
};
exports.bajaCliente = () => {
  return "UPDATE clientes SET active=0 WHERE clientes.id=?";
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

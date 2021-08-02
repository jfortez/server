exports.getEmpresa = () => {
  return "select * from empresa";
};
exports.insertEmpresa = () => {
  return "INSERT INTO empresa SET ?";
};
exports.updateEmpresa = () => {
  return "UPDATE empresa SET ? WHERE id=?";
};

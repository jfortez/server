exports.getPermiso = () => {
  return "SELECT * from permiso_medico";
};
exports.insertPermiso = () => {
  return "INSERT INTO permiso_medico SET ?";
};

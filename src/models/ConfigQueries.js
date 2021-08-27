exports.getValues = () => {
  return "SELECT * from config_values ORDER BY id ASC LIMIT 1";
};
exports.updateValues = () => {
  return "UPDATE config_values SET ? ORDER BY id ASC LIMIT 1";
};

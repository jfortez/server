exports.getValues = () => {
  return "SELECT * from config_values";
};
exports.updateValues = () => {
  return "UPDATE config_values SET ? where id=1";
};

exports.getReceta = () => {
  return "SELECT * from receta";
};
exports.getReceta = () => {
  return "SELECT * from receta where id_agenda=?";
};
exports.insertReceta = () => {
  return "INSERT INTO receta SET ?";
};
exports.updateReceta = () => {
  return "UPDATE receta SET ? WHERE id=?";
};
exports.downReceta = () => {
  return "UPDATE receta SET active=0 WHERE id=?";
};

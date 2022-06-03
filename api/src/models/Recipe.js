const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,

      // allowNull: false
    },

    dish_summary: {
      type: DataTypes.STRING,
      //  allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
    },
    Healthy_food_level: {
      type: DataTypes.INTEGER,
    },
    Step_by_step: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};

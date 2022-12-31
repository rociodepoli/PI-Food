const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    healthScore:{
      type: DataTypes.INTEGER,
      validate:{
        min: 0,
        max: 100
      }
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: 'https://cdn.pixabay.com/photo/2020/08/23/06/54/cooking-5510047_1280.png'
    },
     steps:{
       type: DataTypes.TEXT
     }

  },
  { timestamps: false }
  );
};

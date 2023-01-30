const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID, // no igual al de la api
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthscore:{
      type: DataTypes.INTEGER,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: 'https://banner2.cleanpng.com/20180627/utr/kisspng-cookbook-cooking-recipe-cuisine-recepie-5b333131b187d2.7002878215300815857272.jpg'
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    //tipo de platos
    dishtypes:{
      type: DataTypes.STRING,
    }
  },{timestamps: false});
};

const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('TypeDiet', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            //type: DataTypes.ENUM('gluten free', 'dairy free')
        }
    },{
        timestamps: false
    });
};
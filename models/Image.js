'use strict';

module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define('Image', {
        path: DataTypes.STRING,
        name: DataTypes.STRING,
        suffix: DataTypes.STRING,
        shotAt: DataTypes.DATE,
        comment: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                Image.belongsTo(models.Place, {
                    foreignKey: 'placeId'
                });

                Image.belongsToMany(models.Tag, {
                    through: models.ImageTag,
                    foreignKey: 'imageId'
                });

                Image.belongsToMany(models.Person, {
                    through: models.Link,
                    foreignKey: 'imageId'
                });
            }
        }
    });

    return Image;
};

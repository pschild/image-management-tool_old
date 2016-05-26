'use strict';

module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Tag.belongsToMany(models.Image, {
                    through: models.ImageTag,
                    foreignKey: 'tagId'
                });
            }
        }
    });

    return Tag;
};

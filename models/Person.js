'use strict';

module.exports = function(sequelize, DataTypes) {
    var Person = sequelize.define('Person', {
        name: DataTypes.STRING,
        birthday: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                Person.belongsToMany(models.Image, {
                    through: models.Link,
                    foreignKey: 'personId'
                });
            }
        }
    });

    return Person;
};

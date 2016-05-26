'use strict';

module.exports = function(sequelize, DataTypes) {
    var Place = sequelize.define('Place', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        country: DataTypes.STRING
    });

    return Place;
};

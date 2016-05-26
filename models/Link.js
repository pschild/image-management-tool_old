'use strict';

module.exports = function(sequelize, DataTypes) {
    var Link = sequelize.define('Link', {
        x: DataTypes.DOUBLE,
        y: DataTypes.DOUBLE
    });

    return Link;
};

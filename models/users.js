/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'users',
    underscored: true,
    classMethods: {},
  });
  Users.numberByAge = function (age) {
    return this.sequelize.query(`
      SELECT COUNT(*) AS number_of_users_by_age
      FROM users
      WHERE age = ?;
      `,
      { replacements: [age], type: sequelize.QueryTypes.SELECT }
    ).then(function(result){
      return result[0].number_of_users_by_age;
    });
  };
  Users.under21 = function () {
    return this.sequelize.query(`
      SELECT id,
      first_name,
      last_name,
      age
      FROM users
      WHERE age <= 21
      ORDER BY age DESC;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );
  };
  return Users;
};

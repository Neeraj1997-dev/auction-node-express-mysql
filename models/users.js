/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		uuid: {
			type: DataTypes.STRING(25),
			allowNull: true,
			field: 'uuid'
		},
        firstname: {
			type: DataTypes.STRING(255),
			allowNull: false,
            defaultValue: '',
			field: 'firstname'
		},
        lastname: {
			type: DataTypes.STRING(255),
			allowNull: false,
            defaultValue: '',
			field: 'lastname'
		},
        email: {
			type: DataTypes.STRING(255),
			allowNull: false,
            defaultValue: '',
			field: 'email'
		},
        phone: {
			type: DataTypes.STRING(25),
			allowNull: false,
            defaultValue: '',
			field: 'phone'
		},
        password: {
			type: DataTypes.STRING(20),
			allowNull: true,
            defaultValue: '',
			field: 'password'
		},
        image: {
			type: DataTypes.STRING(255),
			allowNull: true,
            defaultValue: '',
			field: 'image'
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
			field: 'status'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
	}, {
		tableName: 'users'
	});
};
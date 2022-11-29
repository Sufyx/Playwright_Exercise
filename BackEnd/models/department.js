const getDepartmentModel = ( sequelize, {DataTypes}) => {
    const Department = sequelize.define('department', {
        dept_no: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dept_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        // tableName: "Departments"
    }, {
        tableName: "Departments"
    });

    Department.associate = (models) => {
        Department.hasMany(models.Dept_emp, {onDelete: 'CASCADE'});
    };

    return Department;
}

module.exports = getDepartmentModel;
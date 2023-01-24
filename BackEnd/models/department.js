
const getDepartmentModel = (sequelize, { DataTypes }) => {
    const Department = sequelize.define('department', {
        dept_no: {
            type: DataTypes.CHAR,
            unique: true,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dept_name: {
            type: DataTypes.CHAR,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        // tableName: "Departments"
    }, {
        // tableName: "Departments,"
        createdAt: 'date_created',
        timestamps: false,
        updatedAt: false,
    });
    Department.associate = (models) => {
        Department.hasMany(models.Dept_emp, { onDelete: 'CASCADE' });
    };
    Department.removeAttribute('id');
    return Department;
}

module.exports = getDepartmentModel;
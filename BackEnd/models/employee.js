const getEmployeeModel = (sequelize, { DataTypes }) => {
    const Employee = sequelize.define('employee', {
        emp_no: {
            type: DataTypes.BIGINT,
            unique: true,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        first_name: {
            type: DataTypes.CHAR,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        last_name: {
            type: DataTypes.CHAR,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        gender: {
            type: DataTypes.CHAR,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        hire_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        createdAt: 'date_created',
        timestamps: false,
        updatedAt: false,
    });

    Employee.associate = (models) => {
        Employee.hasMany(models.Salary);
    };
    Employee.associate = (models) => {
        Employee.hasMany(models.Department);
    };
    Employee.removeAttribute('id');
    return Employee;
}

module.exports = getEmployeeModel;
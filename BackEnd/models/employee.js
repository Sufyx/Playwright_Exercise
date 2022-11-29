const getEmployeeModel = ( sequelize, {DataTypes}) => {
    const Employee = sequelize.define('employee', {
        employee_no: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        gender: {
            type: DataTypes.STRING,
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
        tableName: "Employees"
    });

    Employee.associate = (models) => {
        Employee.hasMany(models.Salary, {onDelete: 'CASCADE'});
    };
    Employee.associate = (models) => {
        Employee.hasMany(models.Department, {onDelete: 'CASCADE'});
    };

    Employee.findByLogin = async (login) => {
        let emp = await Employee.findOne({
            where: {emp_no: login},
        });
        return emp;
    }
    return Employee;
}

module.exports = getEmployeeModel;
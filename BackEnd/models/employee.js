const getEmployeeModel = ( sequelize, {DataTypes}) => {
    const User = sequelize.define('employee', {
        employee_no: {
            DataTypes: DataTypes.Number,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        first_name: {
            DataTypes: DataTypes.String,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        last_name: {
            DataTypes: DataTypes.String,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        gender: {
            DataTypes: DataTypes.String,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        hire_date: {
            DataTypes: DataTypes.Date,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Employee.associate = (models) => {
        Employee.hasMany(models.Salaries, {onDelete: 'CASCADE'});
    };
    Employee.associate = (models) => {
        Employee.hasMany(models.Departments, {onDelete: 'CASCADE'});
    };

    Employee.findByLogin = async (login) => {
        let emp = await Employee.findOne({
            where: {emp_no: login},
        });
        return emp;
    }

    return Employee;
}

export default getEmployeeModel;
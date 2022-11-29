const getSalaryModel = ( sequelize, {DataTypes}) => {
    const Salary = sequelize.define('salary', {
        employee_no: {
            DataTypes: DataTypes.Number,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        salary: {
            DataTypes: DataTypes.Number,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        from_date: {
            DataTypes: DataTypes.Date,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        to_date: {
            DataTypes: DataTypes.Date,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Salary.associate = (models) => {
        Salary.hasMany(models.Employees, {onDelete: 'CASCADE'});
    };

    return Salary;
}
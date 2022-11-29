const getSalaryModel = ( sequelize, {DataTypes}) => {
    const Salary = sequelize.define('salary', {
        employee_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        from_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        to_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        tableName: "Salaries"
    });
    Salary.associate = (models) => {
        Salary.belongsTo(models.Employee, {onDelete: 'CASCADE'});
    };
    return Salary;
}

module.exports = getSalaryModel;
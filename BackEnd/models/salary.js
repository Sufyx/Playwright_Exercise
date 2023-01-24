
const getSalaryModel = (sequelize, { DataTypes }) => {
    const Salary = sequelize.define('salary', {
        emp_no: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        salary: {
            type: DataTypes.BIGINT,
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
        createdAt: 'date_created',
        timestamps: false,
        updatedAt: false,
    });
    Salary.associate = (models) => {
        Salary.belongsTo(models.Employee, {
            foreignKey: { name: 'emp_no' }
        });
    };
    // Salary.associate = (models) => {
    //     Salary.belongsToMany(models.Dept_emp, { through: 'Employees' });
    // };
    Salary.removeAttribute('id');
    return Salary;
}

module.exports = getSalaryModel;
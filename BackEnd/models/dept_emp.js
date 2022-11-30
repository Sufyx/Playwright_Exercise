const getDept_empModel = (sequelize, { DataTypes }) => {
    const Dept_emp = sequelize.define('dept_emp', {
        emp_no: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dept_no: {
            type: DataTypes.CHAR,
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
        // freezeTableName: true,
        tableName: 'dept_emp',
        createdAt: 'date_created',
        underscore: true,
        timestamps: false,
        updatedAt: false,
    });

    Dept_emp.associate = (models) => {
        Dept_emp.belongsTo(models.Employee, {
            foreignKey: { name: 'emp_no' }
        });
    };
    Dept_emp.associate = (models) => {
        Dept_emp.belongsTo(models.Department, {
            foreignKey: { name: 'dept_no' }
        });
    };
    // Dept_emp.associate = (models) => {
    //     Dept_emp.belongsToMany(models.Salary, { through: models.Employee });
    // };
    Dept_emp.removeAttribute('id');
    return Dept_emp;
}

module.exports = getDept_empModel;
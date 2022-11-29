const getDept_empModel = ( sequelize, {DataTypes}) => {
    const Dept_emp = sequelize.define('dept_emp', {
        employee_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dept_no: {
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
        // freezeTableName: true,
        tableName: "dept_emp"
    });

    Dept_emp.associate = (models) => {
        Dept_emp.belongsTo(models.Employee, {onDelete: 'CASCADE'});
    };
    Dept_emp.associate = (models) => {
        Dept_emp.belongsTo(models.Department, {onDelete: 'CASCADE'});
    };

    return Dept_emp;
}

module.exports = getDept_empModel;
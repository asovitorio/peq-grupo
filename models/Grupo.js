
module.exports = (sequelize, DataTypes) => {
    const Grupo = sequelize.define("Grupo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          nome: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dia_semana: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    },{
      timestamps: true,
      underscored: true,
      paranoid: true,
      tableName: 'grupos'
    });

    Grupo.associate = (models) => {
        Grupo.belongsTo(models.Usuario, {
          foreignKey: "usuario_id",
          as: "usuario",
        });
    };

    return Grupo;
};
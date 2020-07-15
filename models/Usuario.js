module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      timestamps: true,
      underscored: true,
      paranoid:true,
      tableName: 'usuarios'
    }
  );
  Usuario.associate = (models) => {
   Usuario.belongsTo(models.Pessoa, {
      foreignKey: "pessoa_id",
      as: "pessoas",
    });
  };
  return Usuario;
}
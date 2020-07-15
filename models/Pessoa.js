module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define("Pessoa", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          nome: {
    
            type: DataTypes.STRING,
            allowNull: false,
          },
          data_nascimento: {
    
            type: DataTypes.DATE,
            allowNull: true,
          },
          sexo: {
    
            type: DataTypes.STRING,
            allowNull: false,
          },
          telefone: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          cep: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          logradouro: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          numero: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          complemento: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          bairro: {
    
            type: DataTypes.STRING,
            allowNull: true,
          },
          cidade: {
    
            type: DataTypes.STRING,
            allowNull: true,
          },
          uf: {
    
            type: DataTypes.STRING,
            allowNull: true,
          },
        //  created_at: DataTypes.DATE,
        //   updated_at: DataTypes.DATE,
        //   deleted_at: DataTypes.DATE,
    
    },{
      timestamps: true,
      underscored: true,
      paranoide:true,
      tableName: 'pessoas'

    });
    Pessoa.associate = (models) => {
      Pessoa.hasOne(models.Usuario, {
        foreignKey: "pessoa_id",
        as: "usuario",
       
      });
    };

    return Pessoa;
};
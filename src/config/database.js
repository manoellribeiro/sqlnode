module.exports = {
    dialect: 'postgres',   
    host: 'localhost',   
    username: 'postgres',
    password: 'user',
    database: 'sqlnode',
    define: {
      timestamps: true,  //Habilita o created_at e updated_at a serem atualizados automaticamente, mas não criados.
      underscored: true,    
    }

}
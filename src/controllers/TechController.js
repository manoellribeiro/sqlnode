const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {
    async index(req, res){
        const { user_id } = req.params;
        
        const user = await User.findByPk(user_id, {
            include: {association: 'techs', attributes: ['name'], through: { attributes: []}}  //O thorugh cuida da minha tabela que relaciona os dois, podendo escolher quais atributos eu desejo.  
        });      //Utilizo para fazer o Join entre o usuário que eu estou procurando e as suas tecnologias.

        return res.json(user.techs);  //Para retornar as tecnologias específicas de um usuário
    },
    async store(req, res){
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({ error: 'User not found'});
        }

        const [ tech ] = await Tech.findOrCreate({  //Procura e se não achar ele cria a tecnologia, ele devolve um model e um booleano, por isso fizemos a desestruturação
            where: { name }  
        });

        await user.addTech(tech);   //Adicionar uma tecnologia a um usuário

        return res.json(tech);
    },

    async delete(req, res){
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({ error: 'User not found'});
        }

        const tech = await Tech.findOne({  //Procura e se não achar ele cria a tecnologia, ele devolve um model e um booleano, por isso fizemos a desestruturação
            where: {name}  
        });

        await user.removeTech(tech);   //Apenas deleta o relacionamento entre a tecnologia e aquele usuário específico 

        return res.json();
    }
};
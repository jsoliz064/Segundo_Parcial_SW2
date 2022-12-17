const Subscription = require("../models").subscription;
const { Op } = require("sequelize");


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    
    Subscription.findAll({where:condition,order:[['id','ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Subscription."
            });
        });
};
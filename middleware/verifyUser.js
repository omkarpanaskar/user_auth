const { Signup } = require('../models')
const { Op } = require('sequelize')
const verifyUser = (req, res, next) => {
    try {
        Signup.Signup.findOne({
            where: {
                [Op.and]:{
                    name: req.body.name,
                    email: req.body.email
                }
            }
        }).then((user) => {
            if (user) {
                res.status(400).json({ message: "Username and Email already exists" })
            }
        return;
        })
        next();
    } catch (error) {
        console.log("middleware.verifyUser.verifyUser", error);
        next(error);
    }
}
module.exports = verifyUser
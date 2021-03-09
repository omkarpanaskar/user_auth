const { Signup, Role } = require('../../models')
const { loginRepo } = require('../../repository')
const jwt = require('jsonwebtoken')
const maxAge = 5 * 24 * 60 * 60;
const createJWT = id => {
    return jwt.sign({ id }, 'User Created', {
        expiresIn: maxAge
    })
}
const alertError = (err) => {
    let errors = { email: '', name: '', password: '' }
    console.log('error message::', err.message);
    // console.log('error', err);
    if (err.message === 'Incorrect password') {
        errors.password = 'The password is incorrect'
    }
    if (err.message === 'Incorrect email') {
        errors.email = 'This Email is Not found'
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    if (err.code === 11000) {
        errors.email = 'This email is already register.'

    }
    return (errors);
}
const Userlogin = async (req, res) => {
    try {
        let response = null;
        const userLogin = await loginRepo.login(req.body)
        const getRole = await Signup.Signup.findOne({
            where: {
                id: userLogin.user.id
            },
            include: [{
                model: Role.Role,
            }]
        })
        const tokenPayload = {
            userId: userLogin.user.id,
            roleId:userLogin.user.RoleId,
        }
        const token = createJWT(tokenPayload);
        if (userLogin) {

            response = {
                result: userLogin,
                token
            }
        }
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json(response)
    } catch (error) {
        console.log("controller.user.login", error);
        // let errors = alertError(error)
        
        res.status(404).json({ error:"user not found" });
    }
}
module.exports = Userlogin
const Signup = require('../../models/signup')
const jwt = require('jsonwebtoken')
const { Role } = require('../../models')
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
const UserSignup = async (req, res) => {
    try {
        let response = null;
        const verifyRole = await Role.Role.findOne({ where: { id: 2 } })
        if (!verifyRole) {
            throw new Error("role not found");
        }
        const createUser = {
            RoleId: verifyRole.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const newUser = await Signup.Signup.create(createUser);

        Promise.all[newUser.save()]
        const token = createJWT(newUser.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        if (newUser) {
            response = {
                status: 200,
                message: 'User signup success!',
                result: { data: newUser },
                token
            }
        }
        res.status(response.status).json({ response })
    } catch (error) {
        let errors = alertError(error)
        res.status(404).json({ errors });
    }
}
module.exports = UserSignup 
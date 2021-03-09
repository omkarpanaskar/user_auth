const { Signup } = require('../../models')
const bcrypt = require('bcrypt')
/**
 * @function {login} User login authentication function
 * @param {email} email  verify user with email
 * @param {password} password verify user with password
 */
const login = async ({ email, password }) => {
    try {
        let result = {
            status: 400,
            message: "EmailId is not registered",
            user: null
        }
        const user = await findUserByEmail(email)
        if (!user) {
            return result
        } else {
            result = getResult({ user, password })
        }
        return result;
    } catch (error) {
        console.log("repository.user.loginRepo", error);
    }
}
/**
 * 
 * @param {email} email  Match the email from database
 */
const findUserByEmail = async (email) => {
    let user = await Signup.Signup.findOne({
        where: { email: email },
    })
    return user
}
const getResult = async ({ user, password }) => {
    if (!user) {
        return {
            success: false,
            message: 'Email Id not verified!',
            user: null,
            status: 403,

        };
    } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return {
                success: true,
                status: 200,
                message: "User Login successfully",
                user
            }
        } else {
            return {
                success: false,
                status: 400,
                message: "Invalid password",
                user: null,

            }
        }

    }
}
module.exports = login
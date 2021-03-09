'use strict'
const bcrypt = require('bcrypt')
const saltRound = 10;

const encrypt = async (password) =>{
try {
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password, salt)
} catch (error) {
    console.log("utils.passwordHelper.encrypt::", error);
    return Promise.reject(error)
}
}
const comparePassword = async (password, hash)=>{
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.log("utils.passwordHelper.comparePassword::",error);
        return Promise.reject(error);
    }
}

module.exports = {
    encrypt,
    comparePassword
}
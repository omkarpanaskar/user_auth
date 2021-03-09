const { Role } = require('../../models')

const getRole = (role)=>{
    try {
        return Role.Role.findOne({where:{ roleName:role}})
    } catch (error) {
        console.log("repository.roleRepo.getRole",error)
    }
}
module.exports = getRole
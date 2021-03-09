const user = (req, res) => {
    if(req.userId == req.RoleId){
        next()
    }
    return res.status(401).send("Unauthorized!");
}
const admin = (req, res) => {
    if(req.userId == req.RoleId){
        next()
    }
    return res.status(401).send("Unauthorized!");
}
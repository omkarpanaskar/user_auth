const { verify } = require('jsonwebtoken')
const authToken = async(req, res, next) =>{
    try {
        let response ={
            status:401,
            message:"invalid or expire authToken"
        }
        let token = await req.get('authorization')
        if(token){
            token = token.slice(7);
            verify(token, "User Created", (error,next)=>{
                if(error){
                    res.json(response)
                } else{
                    next()
                }
            })
        } else {
            response.json({
                success:false,
                message:"Access denied! unauthorized user"
            })
        }

    } catch (error) {
        
    }
}
module.exports = authToken
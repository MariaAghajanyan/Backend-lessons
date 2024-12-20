function user(req,res,next){
    const {username,email,password}=req.body

    const error=[]
    if(!username|| username.length<3){
        errors.push('username must be min 3 symbols')
    }
    const emailreg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email||emailreg.test(email)){
        error.push('not email!!!')
    }
    if(!password||password.length<6){
        error.push("at least 6 symbols")
    }
    if(error.length>0){
        return res.status(400).json({errors})
    }
    next()
}
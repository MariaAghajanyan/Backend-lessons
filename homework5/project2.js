function isAdmin(req,res,next){
    const user={is_admin:false};

    if(!user.is_admin){
        return res.status(403).json({error:"Acces denied"})
    }
    next()
}
function foo(req,res,next){
    const time=new Date().toISOString()
    console.log(`[${time}] Method: ${req.method}, URL: ${req.url}`);
    next();
}
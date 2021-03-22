module.exports = async function(req, res, proceed) {
    
    
    if (!req.session.user){
        return res.view('pages/unauthorized', {data:'Please login to view this content'})
    }
    if (req.session.user.email) {
        console.log(req.session.user.email)
        return proceed();
    } 
    
}
 

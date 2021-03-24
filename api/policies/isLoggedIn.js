module.exports = async function(req, res, proceed) {
    
    
    if (!req.session.user){
        //return res.view('pages/unauthorized', {data:'Please login to view this content'})
        return res.permissions('Please login to view this content', {when:'isloggedIn policy'},'/login')
    }
    if (req.session.user.email) {
        console.log(req.session.user.email)
        return proceed();
    } 
    
}
 

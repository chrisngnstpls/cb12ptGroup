module.exports = async function(req, res, proceed) {
    
    
    if (!req.session.user){
        //return res.view('pages/unauthorized', {data:'Please login to view this content'})
        return res.permissions('Please login to view this content', {when:'isAdmin policy'},'/login')
    }

    if (req.session.user.email && req.session.user.isAdmin == true) {
        console.log(req.session.user.email)
        return proceed();
    } else {
        return res.permissions('Only admins have access to this page', {when:'isAdmin policy'},'/')
    }
    
}
 

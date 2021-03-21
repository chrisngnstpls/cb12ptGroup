module.exports = async function(req, res, proceed) {
    console.log(req.session.user.email)
    if (req.session.user.email) {
        return proceed();
    } 
    return res.view('pages/unauthorized', {data:'Please login to view this content'})
}
 

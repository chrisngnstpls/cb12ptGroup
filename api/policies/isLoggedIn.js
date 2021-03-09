module.exports = async function(req, res, proceed) {
    console.log(req.session.user_email)
    if (req.session.user_email) {
        return proceed();
    } 
    return res.view('pages/unauthorized', {data:'Please login to view this content'})
} 

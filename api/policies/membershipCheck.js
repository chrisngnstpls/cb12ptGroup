// module.exports = async function(req, res, proceed) {
//     /* edit this to new session.user.*
//     */




//     console.log(req.session.user.id)
//     const currentUserId = req.session.user.id

//     let member = await UserMembership.find({userId: currentUserId});
//     console.log(member.length)
//     let admin = await UserDetails.find({
//       where: {userId: currentUserId, isAdmin: true}
//     })
//     console.log(admin)
//     if(member.length > 0 || admin.length > 0) {
//         return proceed()
//     } else {
//         //return res.view('pages/membership/nomembership', {data: "You need a membership in order to visit the booking page!"})
//         return res.permissions(`You need a membership in order to visit the booking page!`, {when:'membershipCheck policy'},'/memberships')
        
//     }

// }


module.exports = async function(req, res, proceed) {
    if(req.session.user) {
        console.log(req.session.user)
        // const currentUserId = req.session.user
 
    if(req.session.user && req.session.user.hasActiveMembership) {
        return proceed()
    } else {
        return res.view('pages/membership/nomembership', {data: "You need to become a member to access this page!"})
        }
    } else {
        return res.view('pages/unauthorized', {data: "Please login to view this content"})
    }

}
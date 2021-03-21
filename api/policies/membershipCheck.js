module.exports = async function(req, res, proceed) {
    console.log(req.session.user_id)
    const currentUserId = req.session.user.id

    let member = await UserMembership.find({userId: currentUserId});
    console.log(member.length)
    let admin = await UserDetails.find({
      where: {userId: currentUserId, isAdmin: true}
    })
    console.log(admin)
    if(member.length > 0 || admin.length > 0) {
        return proceed()
    } else {
        return res.view('pages/membership/nomembership', {data: "You need a membership in order to visit the booking page!"})
    }

}

module.exports = async function(req, res, proceed,next) {
    const utils = require('../../application/utilities')
    
    // Here I try to check whether the customers that seeks to buy a membership has already one and redirect him to his personal page to update/cancel his status
    /** 
     * @dimitris I'm including here the code for checking whether the user has a membership in the userMembership table
     * I'm suggesting to add the req.session.hasActiveMembership(boolean) value, I'm also not updating the routing
     * as there's no page to redirect to. However the session variable is passed correctly (check the console).
     * We don't actually check if the user has an *active* membership though. This should be implemented correctly
     * 
     * ----
     * 
     * nevermind. integrating the date check template.
     * 
     * @dimitris the function will check for two dates entered and will return if the first date is later 
     * and the difference with the second date.
     * it returns an array of results in the form [boolean, int].
     * 
     * i'm leaving it here and you can complete the routing to the correct pages. 
    */
    let currentUser = req.session.user;
    console.log('inside membershipAccess', currentUser)
    if(!req.session.user){
        return res.redirect('/signup')
    } 
    
    if(!req.session.user.hasActiveMembership){
        console.log('user exists but no membership')
        // await utils.updateMembership(req)
        // return res.view('pages/account/successTemp', {data:'User just Subscribed'})

        return proceed();
    }
    
    if(req.session.user.hasActiveMembership){
        await utils.updateMembership(req,next)
        return res.view('pages/account/successTemp', {data:'User is looking to upgrade the membership'})
    }
    // const localUserId = req.session.user.id;
    // const results = await UserMembership.find({userId:localUserId})
    // let checkSub = utils.validSub

    // if (results.length < 1){ // case where user was never a customer (has never bought a subscription)
    //     req.session.user.hasActiveMembership = false
    //     console.log('user object: ', req.session.user)
    //     console.log('user has no membership record. set to : ' + req.session.user.hasActiveMembership)
        
    // } else {
        
    //     const todayIs = new Date();
    //     let membList = []
    //     //create an array of past memberships
    //     for (let result in results){
    //         let compare = results[result].endDate
    //         membList.push(compare)
    //     }
    //     //get the last ending date of the subscription
    //     let lastDate = membList.pop()
    //     const [isActive, days] = checkSub(todayIs, lastDate)
    //     if(isActive){ // case where the user has an active subscription and has X days left
    //         req.session.user.hasActiveMembership = true
    //         req.session.user.dueDays = days
    //         console.log('user has membership : ' + req.session.user.hasActiveMembership )
    //     } else { // case where the user has a subscription but has expired and it's been expired for X days
    //         req.session.user.hasActiveMembership = false
    //         req.session.user.daysDue = days
    //     }
    //     console.log('user object: ', req.session.user)
    // }

    // if (req.session.user.email) {
    //     return proceed(); 
    // } 

    // console.log('user object: ', req.session.user)
    // return res.view('pages/unauthorized', {data:'Please login in order to proceed'})
} 


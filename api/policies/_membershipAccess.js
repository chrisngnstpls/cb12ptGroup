const { eligibleForOffers } = require('../../application/config');

module.exports = async function(req, res, proceed,next) {
    const utils = require('../../application/utilities')
    const config = require('../../application/config')
    
    const eligibleForOffers = config.eligibleForOffers
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
     * 
    */

    let currentUser = req.session.user;
    console.log('inside membershipAccess', currentUser)
   
    if(!req.session.user){
        console.log('user does not exist redirecting to signup')
        return res.redirect('/signup')
    } 
    
    if(!req.session.user.hasActiveMembership){
        console.log('user exists but no membership')

        return proceed();
    }
    if(req.session.user.membershipName == req.body.name){
        //return res.view('pages/account/successTemp', {data:`You are already subscribed with membersip ${req.body.name}`})
        return res.permissions(`You are already subscribed with membersip ${req.body.name}`,{where:'membership update policy'},'/detailsuser')
    }
    


    if(req.session.user.hasActiveMembership){
        console.log('user exists, is active, updating with new membership')
        await utils.updateMembership(req,next)
        return res.successAction(`Membership upgraded to ${req.body.name}!`, {where:'membership update policy'},'/detailsuser')
        //return res.view('pages/account/successTemp', {data:`You have upgraded to membership ${req.body.name}`})
    }
    //begin edit:::
    // if(req.session.user.hasActiveMembership && req.session.user.membershipName == eligibleForOffers.membershipName){
    //     console.log('user exists, is active, and has a bronze membership, updating to special offer')
    //       await utils.updateMembership(req,next)
    //       return res.successAction(`Membership upgraded to ${req.body.name}!`, {where:'membership update policy'},'/detailsuser')
    //   }
      

} 



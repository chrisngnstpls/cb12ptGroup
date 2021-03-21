const bcrypt = require('bcryptjs');
const utilities = require('../../../application/utilities')


module.exports = {
    inputs:{
        email:{type:'string'},
        password:{type:'string'}
    },
    // exits : {
    //     success: {
    //         viewTemplatePath:'account/controlpanel'
    //     }
    // },

    fn:async function(inputs) {
        console.log(this.req.session)
        let session = this.req.session
        let user;
        let goOnMr;
        // error check inputs 
        
        if (inputs.email && inputs.password) {
            goOnMr = true;
        } else {
            goOnMr = false;
            return this.res.view ('pages/account/login', {data:'please enter ID & pass'})
            
        }

        

        if(session == undefined) {
            return this.res.view('pages/account/login', {data:'please login'})
        }

        if(this.req.session.user == undefined && this.req.method == 'POST' && goOnMr){
            
            user = await User.findOne({email:inputs.email}) // error check 

            if(!user){
                console.log('User not found');
                return this.res.view('pages/unauthorized', {data:'not found'})
            
            } else if (user) {
                
                let userDetails = await UserDetails.findOne({userId:user.id})
                if(this.req.method == 'POST' && user) {
                    let match = await bcrypt.compare(inputs.password, user.password)
                    console.log(`db pass ${user.password}, form pass ${inputs.password}` )
                    
                    if (match) {
                        /*lines below obsolete after session user model implementation */
                        this.req.session.user_email = user.email;
                        this.req.session.user_id = user.id
                        this.req.session.isAdmin = userDetails.isAdmin
                        this.req.session.isTrainer = userDetails.isTrainer
                        this.req.session.isCustomer = userDetails.isCustomer
                        console.log('set session email @ : ' + this.req.session.user_email + 'and user id : ' + this.req.session.user_id);
                        /*end obsoleteness*/
                        
                        let _userModel = utilities.userModel(user,userDetails)
                        const results = await UserMembership.find({userId:user.id})
                        session.user = await _userModel
                        if (results.length < 1){ // case where user was never a customer (has never bought a subscription)
                            this.req.session.user.hasActiveMembership = false
                            console.log('user has no membership record. set to : ' + session.user.hasActiveMembership)
                            
                        } else {
                            let checkSub = utilities.validSub
                            const todayIs = new Date();
                            let membList = []
                            //create an array of past memberships
                            for (let result in results){
                                let compare = results[result].endDate
                                membList.push(compare)
                            }
                            //get the last ending date of the subscription
                            let lastDate = membList.pop()
                            
                            const [isActive, days] = checkSub(todayIs, lastDate)
                            
                            if(isActive){ // case where the user has an active subscription and has X days left
                                this.req.session.user.hasActiveMembership = true
                                this.req.session.user.dueDays = days
                                
                                let query = `
                                SELECT m.name 
                                FROM membership m
                                JOIN usermembership um
                                ON m.id = um.membershipId
                                JOIN user u
                                ON u.id = um.userId
                                WHERE u.id = $1
                                `
                                
                                var _membershipName = await sails.sendNativeQuery(query, [user.id]);
                                let allMemberships = _membershipName.rows
                                let membershipName = allMemberships.pop()
                                this.req.session.user.membershipName = membershipName.name
                                this.req.session.user.membershipEndDate = lastDate
                                console.log('user has membership : ' +  this.req.session.user.hasActiveMembership )
                            
                            
                            } else { // case where the user has a subscription but has expired and it's been expired for X days
                                this.req.session.user.hasActiveMembership = false
                                this.req.session.user.daysDue = days
                            }
                            console.log('Login complete user object: ',  this.req.session.user)
                        }
                    
                        
                        
                        
                        console.log(_userModel)
                        return this.res.redirect('/');
                    } else {
                        this.res.statusCode = 403
                        return this.res.view('pages/unauthorized', {data:'forbidden'});
                    }
                }
            }
        
        }
    }
}
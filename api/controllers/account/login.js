const bcrypt = require('bcryptjs');


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

        if(this.req.session.user_id == undefined && this.req.method == 'POST' && goOnMr){
            
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

                        this.req.session.user_email = user.email;
                        this.req.session.user_id = user.id
                        this.req.session.isAdmin = userDetails.isAdmin
                        this.req.session.isTrainer = userDetails.isTrainer
                        this.req.session.isCustomer = userDetails.isCustomer
                        console.log('set session email @ : ' + this.req.session.user_email + 'and user id : ' + this.req.session.user_id);
                        // console.log(this.req.session.hash)
                        return this.res.view('pages/authorized', {data:'welcome user'});
                    } else {
                        this.res.statusCode = 403
                        return this.res.view('pages/unauthorized', {data:'forbidden'});
                    }
                }
            }
        
        }
    }
}
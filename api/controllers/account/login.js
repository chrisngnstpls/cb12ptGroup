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
            return this.res.view ('pages/account/login', {data:'please enter something'})
            
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
                
                if(this.req.method == 'POST' && user) {
                    let match = await bcrypt.compare(inputs.password, user.password)
                    console.log(`db pass ${user.password}, form pass ${inputs.password}` )
                    if (match) {

                        this.req.session.email = inputs.email;
                        this.req.session.myHash = 123456;
                        console.log('set session email @ : ' + this.req.session.email);
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
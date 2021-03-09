const bcrypt = require('bcryptjs');



module.exports = {
    inputs: {
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        confirmPass: {
            type: 'string',
        },
        fname: {
            type: 'string',
        },
        lname: {
            type: 'string',
        },
        address : {
            type : 'string'
        },

    },
    exits: {
        success: {
            viewTemplatePath: 'pages/account/successTemp' // view account/signup.ejs
        }
    },

    fn: async function(inputs) {
        let res = this.res
        let req = this.req


        let pass = inputs.password;

        await bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(pass, salt, async function(err, hash){
                if(!err){
                    console.log('writing hash ' + hash)
                    console.log('image : ' + req.file)
                    var user = await User.create({firstName:inputs.fname,lastName:inputs.lname, password:hash, email:inputs.email, money:'10'}).fetch()
                    var userDetails = await UserDetails.create({address:inputs.address, userId:user.id, isCustomer:true, isAdmin:false, isTrainer:false})
                    
                }
            })
        })

        return {data:'oke'}
    }
}
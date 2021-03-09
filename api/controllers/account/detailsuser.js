const { strict } = require('assert');
const crypto = require('crypto-random-string');
// const resizeImage = require('resize-image')

module.exports = {
    inputs : {
        birthdate : {
            type:'string'
        },
        bio : {
            type:'string'
        },
        address : {
            type:'string'
        }
    },
    
    // exits: {
    //     success: {
    //         viewTemplatePath: 'pages/account/detailsuser' // exit to random view
    //     }
    // },

    fn: async function(inputs) {

        let req = this.req
        let res = this.res 
        let method = await req.method
        //console.log(this.session.email)

        if(method ==='POST'){
            let localPath = require('path').resolve(sails.config.appPath, 'assets/images')
            
            let bio = inputs.bio
            let bdate = inputs.birthdate
            let address = inputs.address
            
            
            let postUser = await User.findOne({email:'asdasd@gmail.com'}) // error check
            
            let filename =  await postUser.firstName+postUser.lastName+ crypto({length:5})+'.jpg'
            let imageLocation = await localPath + '\\' + filename
            let updatedUser = await UserDetails.updateOne({userId:postUser.id}).set({bio:bio, address:address, image:imageLocation}) // error check 

            req.file('avatar').upload({
                dirname:localPath,
                saveAs : filename
            }, function (err, uploadedFiles) { 
                if (err) return res.serverError(err) // error check ??? serverError 
                })
            console.log('POST method : ' + method)
            return this.res.view('pages/account/successTemp', {data:updatedUser.bio})
        
        
        } else if(method==='GET'){
            
            console.log('GET method : ' + method)
            var user = await User.findOne({email:'asdasd@gmail.com'})
            var uid = await user.id
            var details = await UserDetails.findOne({userId:uid}) // error Check 
            var imageLocation = await details.image.toString()
            var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
            var locations = await imageLocation.split(GETlocalPath)
            // console.log(details.userId)
            // console.log(locations.length)
            // console.log(locations[1])

            return this.res.view('pages/account/detailsuser', {data:method, address:details.address, bio:details.bio, location:locations[1]})
        } else {
            console.log('no post or get. current method : ' + method)
        }

        //return {data:method}
    }
}

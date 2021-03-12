const { strict } = require('assert');
const crypto = require('crypto-random-string');
const fs = require('fs')
const glob = require('glob')
const sharp = require('sharp')

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


    fn: async function(inputs) {

        let req = this.req
        let res = this.res 
        let method = await req.method

        /* This controller will check for method type and redirect accordingly. 
            It handles POST/GET 
        */
        if(method ==='POST'){
            let localPath = require('path').resolve(sails.config.appPath, 'assets/images')
            
            let bio = inputs.bio
            let bdate = inputs.birthdate
            let address = inputs.address

            let postUser = await User.findOne({email:req.session.user_email}) // error check // session.email
            let currentUserDetails = await UserDetails.findOne({userId:postUser.id})


            let filename =  await postUser.email+crypto({length:5})+'.jpg';
            let tempFile = await localPath + '\\' +"_"+filename;
            let imageLocation = await localPath + '\\' + filename
            let updatedUser = await UserDetails.updateOne({userId:postUser.id}).set({bio:bio, address:address, image:imageLocation}) // error check 
            /* 
                Upload image procedure : 
                    Check to see if user has entered a new image =>
                        a: look for similar images in folder => delete similar images
                        
            */

            req.file('avatar').upload({
                dirname:localPath,
                saveAs : filename
            }, function (err, uploadedFiles) { 
                if (err) return res.serverError(err) // error check ??? serverError 
                
                if (_.isEmpty(uploadedFiles)) {
                    // code to run if input is empty
                    console.log('empty field')
                
                } else {
                    let lookup = postUser.email;
                    
                    let globString = '**/' + lookup + '*.jpg'
                    
                    glob(globString, function (err, files){
                        
                        for (let file of files){
                            
                            let localFilename = file.split('images/')
                            console.log(filename, file, localFilename[1])
                            
                            if(filename !== localFilename[1] ){
                                fs.unlink(file, function(err){
                                    if(err){
                                        console.log(err)
                                    }
                                })
                            }
                        }
                    })
                    /*
                    resize function goes here : 

                    sharp(imageLocation).resize(150,100).toFile(tempFile, function(err){
                        console.log(err)
                    })
                    fs.unlink(imageLocation, function(err){
                        if (err){
                            console.log('error deleting : ' + err)
                        }
                    })
                    fs.rename(imageLocation, tempFile, function(err){
                        console.log('error resizing : ' + err)
                    })
                    */
                }
            })
            console.log('POST method : ' + method)
            return this.res.view('pages/account/successTemp', {data:updatedUser.bio})
        
        
        } else if(method==='GET'){
            let fullurl;
            console.log('GET method : ' + method)
            var user = await User.findOne({email:req.session.user_email})
            var uid = await user.id
            var details = await UserDetails.findOne({userId:uid}) // error Check 
            var imageLocation = await details.image
            var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
            var locations = await imageLocation.split(GETlocalPath)

            return this.res.view('pages/account/detailsuser', {data:method, address:details.address, bio:details.bio, location:locations[1], url:fullurl})
        } else {
            console.log('no post or get. current method : ' + method)
        }

        //return {data:method}
    }
}

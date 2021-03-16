const _Trainings = require('../../../classes/trainingsList')
const { strict } = require('assert');
const crypto = require('crypto-random-string');
const fs = require('fs')
const glob = require('glob')

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


            let filename =  await postUser.email+crypto({length:5})+'.jpg'
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


                }
            })
            console.log('POST method : ' + method)
            return this.res.view('pages/account/successTemp', {data:updatedUser.bio})
        
        
        } else if(method==='GET'){
            let trainingPayload = []
            let fullurl;
            console.log('GET method : ' + method)
            var user = await User.findOne({email:req.session.user_email})
            var user_id = await user.id
            var details = await UserDetails.findOne({userId:user_id}) // error Check 
            var isTrainer = await details.isTrainer
            var imageLocation = await details.image
            var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
            var locations = await imageLocation.split(GETlocalPath)
            
            /**
             * @team Implemented here different methods for the user details table for the two different cases (customer/trainer)
             * this will redirect to the details page with all the trainings history. The comparison for upcoming or past trainings
             * should be done frontside. (ex : if (current date < trainings[training].startDate) return future)
             */
            
            if(isTrainer>0){
                console.log('Trainer ID : ' + user_id)
                var trainings = await Training.find({trainerId:user_id})
                for (let training in trainings){
                    //console.log('searching for CUSTOMER ID: ' + trainings[training].customerId)
                    let searchFor = trainings[training].customerId
                    let _customer = await User.find({where : {id:searchFor}}).limit(1)
                    //console.log('customer : ' + _customer[0].id)
                    let row = new _Trainings(_customer[0].email, _customer[0].firstName, _customer[0].lastName,trainings[training].startDate,trainings[training].endDate,trainings[training].location)
                    //console.log('printing training details class : ' + Object.values(row))
                    trainingPayload.push(row)
                }
            } else if (isTrainer == 0){
                var userTrainings = await Training.find({customerId:user_id})
                for (training in userTrainings){
                    let searchFor = userTrainings[training].trainerId
                    let _trainer = await User.find({where : {id:searchFor}}).limit(1);
                    let row = new _Trainings(_trainer[0].email, _trainer[0].firstName, _trainer[0].lastName, userTrainings[training].startDate, userTrainings[training].endDate, userTrainings[training].location)
                    console.log('printing training details class : ' + Object.values(row))
                    trainingPayload.push(row)
                }
                
            }
            

            return this.res.view('pages/account/detailsuser', {data:method, address:details.address, bio:details.bio, location:locations[1], url:fullurl, payload:trainingPayload})
        } else {
            console.log('no post or get. current method : ' + method)
        }

        //return {data:method}
    }
}

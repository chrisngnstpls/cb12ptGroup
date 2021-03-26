const NewTraining = require('../../../classes/newBooking')

module.exports = {
   inputs:{
       id : {
           type:'number'
        }
    },

    fn: async function({id}) {
        var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
        
        //uncomment for debug
        console.log('trainer ID selected : ' + id)
        console.log('firing from inside trainer.js controller')
        
        
        let session = this.req.session;
        session.trainer_selected = id;
        
        let req = this.req;
        let res = this.res;
        let payload = []; 
        let trainerTrainings = await Training.find({trainerId:session.trainer_selected})
        
        let trainerData = await User.findOne({id:session.trainer_selected})
        let extraData = await UserDetails.findOne({userId:session.trainer_selected})
        
        let dataPacket = {trainerFirstName : trainerData.firstName,
                            trainerLastName : trainerData.lastName,
                            trainerBio : extraData.bio,
                            trainerImage : extraData.image.split(GETlocalPath)[1]}

            session.trainerFname = dataPacket.trainerFirstName;
            session.trainerLname = dataPacket.trainerLastName;
            session.trainerBio = dataPacket.trainerBio;
            session.trainerImage = dataPacket.trainerImage;
            console.log(session.trainerFname)
            console.log(session.trainerLname)
        
        for (training in trainerTrainings) {
            let _training = new NewTraining(
                trainerTrainings[training].location,
                trainerTrainings[training].startDate,
                trainerTrainings[training].trainerId,
                trainerTrainings[training].customerId,
                trainerTrainings[training].endDate
            );
            // console.log(Object.values(_training), _training.endDate)
            payload.push(_training);
        }

        // //Uncomment for debug
        // console.log('Session email : ' + session.user_email + 'Session User ID : '+  session.user_id + 'Session Trainer Selected ID : ' + session.trainer_selected);
        // console.log('end trainer.js output');
        
        return res.view('pages/account/trainerpage',{errorList:'', bookedTrainings:payload, trainerObject : dataPacket }) 
    }
}

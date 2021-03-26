module.exports = {
    inputs:{
        id : {
            type:'number'
         }
     },
 
     fn: async function({id}) {
         //var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
         let deletedTraining = await Training.updateOne({id:id}).set({isCancelled:1})
         
         if(this.req.session.user.trainingsBooked == 1){
            this.req.session.user.trainingsBooked = 0
         } else {
            this.req.session.user.trainingsBooked = this.req.session.user.trainingsBooked - 1
         }
         console.log('deleted a training, new user object : ', this.req.session.user)
         if(deletedTraining){
            return this.res.successAction('Training deleted.', {where:'inside delete training'},'/detailsuser')
         } else {
            return this.res.permissions('Training not deleted',{where:'inside delete training'},'/detailsuser')
         }
     }
 }
 
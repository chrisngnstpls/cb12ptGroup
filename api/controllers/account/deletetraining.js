module.exports = {
    inputs:{
        id : {
            type:'number'
         }
     },
 
     fn: async function({id}) {
         //var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
         let deletedTraining = await Training.updateOne({id:id}).set({isCancelled:1})
         
         if(deletedTraining){
            return this.res.successAction('Training deleted.', {where:'inside delete training'},'/detailsuser')
         } else {
            return this.res.permissions('Training not deleted',{where:'inside delete training'},'/detailsuser')
         }
     }
 }
 
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
            this.res.view('pages/authorized',{data:'Training Deleted'}) 
         } else {
            this.res.view('pages/authorized',{data:'Training Not Deleted'})
         }
     }
 }
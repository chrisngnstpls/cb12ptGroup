module.exports = {
   inputs:{
       id : {
           type:'number'
        }
    },

    fn: async function({id}) {
        
        /*
        //uncomment for debug
        console.log('trainer ID selected : ' + id)
        console.log('firing from inside trainer.js controller')
        */
        
        let session = this.req.session;
        session.trainer_selected = id;
        let req = this.req;
        let res = this.res;
        /*
        //Uncomment for debug
        console.log('Session email : ' + session.user_email + 'Session User ID : '+  session.user_id + 'Session Trainer Selected ID : ' + session.trainer_selected);
        console.log('end trainer.js output');
        */
        return res.view('pages/account/trainerpage',{errorList:''})
    }
}

module.exports = {
    
    exits : {
        success : {
            viewTemplatePath : 'pages/homepage'
        }
    },


    fn: async function() {
        if (this.req.session){
            console.log(`Requested logout of user : ${this.req.session.user_id}` )
            this.req.session.destroy(function (err) {
                if(err){
                    console.log(err)
                } 
            })
            
        }
        return {}
    }
}
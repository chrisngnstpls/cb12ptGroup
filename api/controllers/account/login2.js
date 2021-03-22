
module.exports = {


    fn:async function () {
        console.log(this.req.session)
        
        if (this.req.session.user !== undefined){
            //return this.res.view('pages/authorized', {data:'already logged in'})
            return this.res.successAction('Already logged in!', {where:'user tried to login again inside login2'},'/')
        } 
        if (this.req.session.user == undefined){
            return this.res.view('pages/account/login', {data:'please login'})
            
        }

        //return {}
    }
    
}
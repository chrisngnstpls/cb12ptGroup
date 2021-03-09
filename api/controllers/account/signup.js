module.exports = {
    
    exits: {
        success: {
            viewTemplatePath: 'pages/account/signup' // default exit view to signup form
        }
    },

    fn: async function() {
        
        /* This is the GET controller for the signup page. 
            When initially called, it will redirect to the sign up page with an object of empty errors.
            The object error *MUST* be passed even if empty. 
        */
        
        
        let error = {generalError:'', fnameError:'', lnameError:'', addressError:'', passwordError:'', confirmPasswordError:'', emailError:''}
        return {errorList:error}
    }
}
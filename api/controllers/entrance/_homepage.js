module.exports = {
    exits: {
        success: {
            viewTemplatePath: 'pages/homepage2'
        }
    },
    fn: async function() {
        req = this.req;
        res = this.res;
        //console.log(req.session.user.email)
        

        return { }
    }
}
module.exports = {
    exits: {
        success: {
            viewTemplatePath: 'pages/homepage3'
        }
    },
    fn: async function() {
        req = this.req;
        res = this.res;
        //console.log(req.session.user.email)
        

        return { }
    }
}
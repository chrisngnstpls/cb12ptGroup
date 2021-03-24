const utils = require('../../../application/utilities');
module.exports = {
    // inputs: {
      
    // },
    exits: {
        success: {
            viewTemplatePath: 'pages/admindash/admindashboard'
        }
    },
    fn: async function() {
        let now = new Date();
        var today = utils.formatDate(now);
        console.log(today);

        var query1 = `
        SELECT id, startDate
        FROM training 
        WHERE startDate < $1 
        `

        var payload1 = await sails.sendNativeQuery(query1, [today]);
        console.log(payload1)
       

        // Here we select the current user who is loggedIn and has a membership

        let userId = this.req.session.user_id;

        var query3 = `
        SELECT *
        FROM user
        JOIN usermembership
        ON user.id = usermembership.userId
        WHERE $1 = usermembership.userId
        `;

        var payload3 = await sails.sendNativeQuery(query3, [userId]);
        // console.log(payload3.rows);

        // Here we use a VIEW with the same query as above. To use a VIEW we need to have models - migrate:'safe' otherwise it will break 

        //  var query3 = ` 
        //     SELECT * FROM test_view;
        //  `
        //  var payload = await sails.sendNativeQuery(query3, []);
        let data1 = JSON.stringify(payload1)
        let data3 = JSON.stringify(payload3)

        // debug mode
        // sails.log(data)
        // console.log(this.req.user_id)

        
        return { data1: data1, data3: data3}
    }
}
module.exports = {
    // inputs: {

    // },
    exits: {
        success: {
            viewTemplatePath: 'pages/admindash/userdashboard'
        }
    },
    fn: async function() {
        // creation of a simple query to test sails sendNativeQuery functionality
        
        var query1 = `
        SELECT *
        from user
        WHERE user.money = $1 
        `;

        var payload1 = await sails.sendNativeQuery(query1, [10]);
        // Here we create a more complex query. The name of the first parameter after WHERE clause does not enter the brackets successfully

        var query2 = `
        SELECT firstName, lastName, email
        FROM user
        JOIN training
        ON user.id = training.customerId
        JOIN usermembership
        ON user.id = usermembership.userId
        WHERE user.id = training.customerId && usermembership.membershipId = $1 OR membershipId = $2 OR membershipId = $3
        `;
        var payload2 = await sails.sendNativeQuery(query2, [1, 2, 3]);

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
        let data2 = JSON.stringify(payload2)
        let data3 = JSON.stringify(payload3)
        let newData = JSON.parse(data3);
        // console.log(newData.user_id)

        // console.log(this.req.user_id)

        // debug mode
        // sails.log(data)

        
        return {data1: data1, data2: data2, data3: data3}
    }
}
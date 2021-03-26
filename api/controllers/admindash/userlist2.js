module.exports = {
    inputs: {
        usertype: {
            type: 'string'
        },
        userprop: {
            type: 'string'
        },
        userprop2: {
            type: 'string'
        },
          startDate: {
            type: "string"
        },
        endDate: {
            type: "string"
        }
    },
    // exits: {
    //     success: {
    //         viewTemplatePath: 'pages/admindash/resultlists'
    //     }
    // },
  

    fn: async function({usertype, userprop, userprop2, startDate, endDate}) {
        let list = [];

        // console.log(startDate);
        // console.log(endDate)

        if(usertype == "" && userprop == "" && userprop2 == "") {
        //    return this.res.BadCombo("Input fields are empty. Please fill in to proceed!")
        return this.res.view('pages/admindash/errorpage', {data: 'Please fill in all fields to proceed!'})

        } 

        else if(usertype == 'Customers' && userprop == "Training" && userprop2 == "Cancelled") {
            var query2 = `
            SELECT *
            FROM user
            JOIN training
            ON user.id = training.customerId
            WHERE training.isCancelled = $1
            
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);

             let data = await JSON.stringify(payload);

             return this.res.view('pages/admindash/resultlists', {data: data})
        }

        else if(usertype == 'Customers' && userprop == "Membership" && userprop2 == "Cancelled") {
             var query2 = `
            SELECT *
            FROM user
            JOIN usermembership
            ON user.id = usermembership.userId
            WHERE usermembership.isCancelled = $1
            
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);

             let data = await JSON.stringify(payload);

             return this.res.view('pages/admindash/resultlists', {data: data})
        }

        else if(usertype == 'Trainers' && userprop == "Training" && userprop2 == "Cancelled") {
             var query2 = `
            SELECT *
            FROM user
            JOIN training
            ON user.id = training.trainerId
            WHERE training.isCancelled = $1
            
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);

             let data = await JSON.stringify(payload);

             return this.res.view('pages/admindash/resultlists', {data: data})
        }


        else if(usertype == 'Customers' && userprop == "" && userprop2 == "") {
            var query1 = `
            SELECT *
            FROM user
            WHERE user.money = $1 
            `;

        var payload = await sails.sendNativeQuery(query1, [10]);
        let data = await JSON.stringify(payload);
        return this.res.view('pages/admindash/resultlists', {data: data})

        } 
        
        else if(usertype == 'Trainers' && userprop == "") {
             var query2 = `
            SELECT *
            FROM user
            JOIN userdetails
            ON user.id = userdetails.userId
            WHERE isTrainer = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);
             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists', {data: data})
        }
        

        else if(usertype == 'Customers' && userprop == "Membership") {
             var query2 = `
            SELECT user.id, user.firstName, user.lastName, user.email, membership.name
            FROM user
            JOIN usermembership
            ON user.id = usermembership.userId
            JOIN membership
            ON membership.id = usermembership.membershipId
            WHERE user.id = usermembership.userId
            `;

             var payload = await sails.sendNativeQuery(query2, []);
             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists', {data: data})
        }  
        else if(usertype == 'Customers' && userprop == "Training" && userprop2 == "") {
             var query2 = `
            SELECT DISTINCT user.id, user.firstName, user.lastName, user.email, training.trainerId, training.startDate
            FROM user
            JOIN training
            ON user.id = training.customerId
            WHERE training.isCancelled = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [0]);
             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists', {data: data})
        }

        else if(usertype == 'Trainers' && userprop == "Training" && userprop2 == "") {
             var query2 = `
            SELECT user.id, user.firstName, user.lastName, user.email, training.startDate,
            training.customerId
            FROM user
            JOIN training
            ON user.id = training.trainerId
            WHERE user.id = training.trainerId
            AND training.isCancelled = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [0]);
             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists', {data: data})
        }

        else if(usertype == "" && userprop == "Training") {
            
            return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})

        }

         else if(usertype == "" && userprop == "Membership") {
            
            return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})

        }
        

        else if(usertype == 'Trainers' && userprop == "Membership" && userprop2 == "Cancelled") {
           return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        }

         else if(usertype == 'Trainers' && userprop == "Membership") {
        return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        }

         if(usertype == "" && userprop == "" && userprop2 == "Cancelled") {
        return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        } 

        if(usertype == "Customers" && userprop == "" && userprop2 == "Cancelled") {
        return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        } 


        var queryDate = `
        SELECT t.customerId, COUNT(t.id) AS total_sessions, u.email
        FROM training t
        JOIN user u
        ON u.id = t.customerId
        WHERE t.isCancelled = $1 AND t.startDate > $2 AND t.endDate < $3
        GROUP BY t.customerId 
        ORDER BY total_sessions DESC
        `

        var payload1 = await sails.sendNativeQuery(queryDate, [0, startDate, endDate]);
        let data1 = await JSON.stringify(payload1);
        // console.log(data1)
        return this.res.view('pages/admindash/resultlists2', {data1: data1, startDate:startDate, endDate: endDate })
        // let data = await JSON.stringify(payload);
        //  console.log(data)
        
    //    return { data: data}
    }
}
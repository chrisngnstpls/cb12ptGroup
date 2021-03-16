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
        }
    },
    exits: {
        success: {
            viewTemplatePath: 'pages/admindash/resultlists'
        }
    },
  

    fn: async function({usertype, userprop, userprop2}) {
        let list = [];

        if(usertype == "" && userprop == "" && userprop2 == "") {
           return this.res.BadCombo("Input fields are empty. Please fill in to proceed!")

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
        }


        else if(usertype == 'Customers' && userprop == "" && userprop2 == "") {
            var query1 = `
            SELECT *
            FROM user
            WHERE user.money = $1 
            `;

        var payload = await sails.sendNativeQuery(query1, [10]);

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
        }
        

        else if(usertype == 'Customers' && userprop == "Membership") {
             var query2 = `
            SELECT *
            FROM user
            JOIN usermembership
            ON user.id = usermembership.userId
            WHERE user.id = usermembership.userId
            `;

             var payload = await sails.sendNativeQuery(query2, []);
        }  
        else if(usertype == 'Customers' && userprop == "Training") {
             var query2 = `
            SELECT *
            FROM user
            JOIN training
            ON user.id = training.customerId
            WHERE user.id = training.customerId
            `;

             var payload = await sails.sendNativeQuery(query2, []);
        }

        else if(usertype == 'Trainers' && userprop == "Training") {
             var query2 = `
            SELECT *
            FROM user
            JOIN training
            ON user.id = training.trainerId
            WHERE user.id = training.trainerId
            `;

             var payload = await sails.sendNativeQuery(query2, []);
        }

        else if(usertype == "" && userprop == "Training") {
            return this.res.BadCombo("Please fill in both fields to proceed.")

        }

         else if(usertype == "" && userprop == "Membership") {
            return this.res.BadCombo("Please fill in both fields to proceed.")

        }

        else if(usertype == 'Trainers' && userprop == "Membership" && userprop2 == "Cancelled") {
             return this.res.BadCombo("There is no available data for this query.")
        }

         else if(usertype == 'Trainers' && userprop == "Membership") {
           return this.res.BadCombo("No available results for this combination of data!")
        }

         if(usertype == "" && userprop == "" && userprop2 == "Cancelled") {
           return this.res.BadCombo("Please fill in all previous fields to proceed!")

        } 

        if(usertype == "Customers" && userprop == "" && userprop2 == "Cancelled") {
           return this.res.BadCombo("Please fill in all  fields to proceed!")
        } 


            let data = await JSON.stringify(payload);
        //  console.log(data)
        
       return { data: data}
    }
}
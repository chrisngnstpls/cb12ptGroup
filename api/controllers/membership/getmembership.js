const NewUserMembership = require('../../../classes/newuserMembership');

module.exports = {
    inputs: {
        id: {
            type: 'number'
        },
        startDate: {
            type: 'string'
        },
        endDate: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        userId: {
            type: 'number'
        },
        // membershipId: {
        //     type: 'number'
        // }
    },
    exits: {
        success: {
            viewTemplatePath: 'pages/account/successTemp' // exit view to membership submission form
        }
    },
    fn: async function(inputs) {
        let res = this.res;
        let req = this.req;    
        
        let session = this.req.session;
        console.log(session.user_id);
        console.log(req.body);

        let id = req.body.id;
        let startDate = req.body.startDate;
        let price = req.body.price;
        let isCancelled = req.body.isCancelled;
        let userId = session.user_id;
        let membershipId = req.body.id;

        /**
         * updated with Class corrections 
         */
        let _newMembership = new NewUserMembership(id,startDate, price, isCancelled, userId, membershipId);
        console.log(_newMembership.endDate);

        var newUserMembership = await UserMembership.create({
            startDate: _newMembership.startDate,
            endDate: _newMembership.endDate,
            price: _newMembership.price,
            isCancelled: _newMembership.isCancelled,
            userId: _newMembership.userId,
            membershipId: _newMembership.id
        })
        console.log(_newMembership);


        
        return {data: "Success!!! New membership created!"}
    }
}
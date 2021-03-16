const MView = require('../../../classes/membershipType2');


module.exports = {
    fn: async function() {

        let payload = [];

        let membershipList = await Membership.find({
            id: [1, 2, 3] 
        });


        for(let membership in membershipList) {
            
            // Here we populate the price field on GET based on the name of the membership.
            if(membershipList[membership].name == 'Bronze') {
                membershipList[membership].price = 200
            } else if (membershipList[membership].name == 'Silver') {
                membershipList[membership].price = 300
            } else {
                membershipList[membership].price = 600
            }
            // And then we prepare our class Object to server to the view through the data attribute
            let memDetails = new MView(
                await membershipList[membership].id,
                await membershipList[membership].name,
                await membershipList[membership].typeCount,
                await membershipList[membership].description,
                await membershipList[membership].price
            ); 
            // console.log(memDetails.price)
        
            payload.push(memDetails)
        }
        console.log(this.req.session.usermembership)

        this.res.view('pages/membership/memberships', {data: payload})
        // return {}
    }
}
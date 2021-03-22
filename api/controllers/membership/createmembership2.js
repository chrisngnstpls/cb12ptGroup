const MembershipType = require("../../../classes/membershipType");


module.exports = {
    inputs: {
        name: {
            type: 'string',
        },
        typeCount: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
    },
    fn: async function({name, typeCount, description}) {
        let res = this.res;
        let req = this.req;

        let _membership = new MembershipType( name, typeCount, description);
        console.log("123" + _membership.price)

        var membership = await Membership.create({
            name: _membership.name,
            typeCount: _membership.typecount,
            description: _membership.description,
            // price: _membership.price
        }).fetch()

        // <-- debug mode -->
        // console.log(_membership)
        // console.log(typeof(_membership.price))

        // var usermembership = await UserMembership.create({
        //     price: _membership.price,
        //     membershipId: membership.id
        // }).fetch()

        return res.successAction('Membership created!', {where:'new membership'},'/trainers')


    }
}
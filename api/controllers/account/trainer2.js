const Booking = require('../../../classes/newBooking')


module.exports = {
    /*

    Not quite sure we actually need inputs. Feeling lucky, may remove later

    */
    inputs: {
        trainerId: {
            type: 'number'
        },
        customerId: {
            type: 'number'
        },
        startDate: {
            type: 'string'
        },
        location: {
            type: 'string'
        },
        isCancelled: {
            type: 'boolean'
        }
    },
    // exits: {
    //     success: {
    //         viewTemplatePath: 'pages/account/successTemp' // default exit view to signup form
    //     }
    // },

    fn: async function(inputs) {
        /* //uncomment for debugging
       
        console.log('Inside trainers 2 and logging credentials')
        console.log(this.req.session) // works
        console.log(inputs.location)//works
        console.log(inputs.startDate)//works
        console.log(this.req.session.user.id, this.req.session.user.email)
        */
        

        let session = this.req.session // <- get access to the req session and body object
        let body = this.req.body

        let _booking = new Booking(body.location, body.startDate, session.trainer_selected, session.user.id)
        
        //uncomment for debug 

        // console.log('Booking Object : ' + _booking)
        // console.log('end Date : ' + _booking.endDate)
        // console.log('customer_id : ' + _booking.customerId)
        // console.log('trainer_id : ' + _booking.trainerId)
    
        
        var training = await Training.create({
            location:_booking.location,
            startDate:_booking.startDate,
            isCancelled: _booking.isCancelled,
            endDate : _booking.endDate,
            trainerId:_booking.trainerId,
            customerId:_booking.customerId,
            
        })
        session.user.trainingsBooked = session.user.trainingsBooked + 1
        console.log('booked a training, new user object : ', session.user)
        
        //return {data:'new training created', trainerObject : ""}
        return this.res.successAction(`Success! new training created at ${_booking.startDate}`, {where:'inside trainer2'},'/detailsuser')
    }
}

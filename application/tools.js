const _dateFormat = require('dateformat')
const utils = require('./utilities')

async function getBookedTrainings(id,req,res){
    let today = new Date()
    today = utils.formatDate(today)
    let trainingsBooked;
    const bookedTrainings = await Training.find()
        .where(
            {
                customerId:id,
                isCancelled:0,
                startDate:{'>':today}
            })
    if(bookedTrainings){
        trainingsBooked = bookedTrainings.length
    } else {
        trainingsBooked = 0
    }
    return await Promise.resolve(trainingsBooked)
}

module.exports = {
    calculateTrainings:getBookedTrainings
}
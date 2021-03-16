/* updating with fixes :
    
    @dimitris : the function you included here does not do what you intended for it to do.
    You can do calculations using the actual Date() object.
    see below for method used : 
        . create a new date object using the date parsed as req.body.startDate
        . create a new date object for now using the new Date() method.
        . directly compare the 2 date objects inside your if() statement.
    
        commenting out the function for reference and will remove on next push

    policy now works as expected.


*/
    
module.exports = async function(req, res, proceed) {
   let startDate = new Date(req.body.startDate);
   let location = req.body.location;
   let trainerId = req.session.trainer_selected;
   let customerId = req.session.user_id;
   let endDate = req.session.endDate
   const isToday = new Date()
   
   console.log('inside policy trainingCheck')
   console.log(startDate, location, trainerId, customerId,endDate)
   
//    function calcDate(today) {
//     today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth()+1;
//     let day = today.getDate();
//     let hour = today.getHours();
//     let minutes = today.getMinutes();
//     let datetime = year + "-" + month + "-" + day + " " + hour + ":" + minutes;
//     return datetime;
//     }

   let errorLog = {};

   if(startDate == "" || location == "") {
       errorLog.error = "Please fill in all fields"
   } 
   if(trainerId == customerId) {
       errorLog.error = "Sorry you cannot book with yourself!"
   } 
   if(startDate < isToday) {
       errorLog.error = "You need to choose a valid date" 
   }
   if(Object.keys(errorLog).length>0) {
            return res.view('pages/account/trainerpage', {errorList:errorLog})
            }

   return proceed();

}


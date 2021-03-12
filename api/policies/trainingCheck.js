module.exports = async function(req, res, proceed) {
   let startDate = req.body.startDate;
   let location = req.body.location;

   let errorLog = {};
   if(startDate == "" || location == "") {
       errorLog.error = "Please fill in all fields"
   } 
   if(Object.keys(errorLog).length>0) {
            return res.view('pages/account/trainerpage', {errorList:errorLog})
            }

   return proceed();
}

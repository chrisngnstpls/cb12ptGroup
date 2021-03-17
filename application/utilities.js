/**
 * Utilities module. Include your most used function in here and export accordingly.
 * No spam *
 */
 const sharp = require('sharp')
 const _dateFormat = require('dateformat')
 const fs = require('fs')

 //Function to check subscription validity 
 
 function validSubscription(now,compare){
     let _date1 = new Date(now)
     let _date2 = new Date(compare)
     let oneDay = 24 * 60 * 60 * 1000
     const diffDays = Math.round(Math.abs((_date2 - _date1) / oneDay));
     if(_date2>_date1){
         console.log(`subscription valid, ${diffDays} days left.`)
         return [true,diffDays]
     } else {
         console.log(`subscription expired, ${diffDays} days due.`)
         return [false,diffDays]
     }    
 };
 
 
 function formatDate(date){
     let newDate = new Date(date)
     let _date = _dateFormat(newDate,"yyyy-mm-dd HH:MM")
     return _date
 };
 
 // Function to return Capitalized Names
 function nameEntry(name) {
     var splitStr = name.toLowerCase().split(' ');
     for (var i = 0; i < splitStr.length; i++) {
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
     }
     return splitStr.join(' '); 
 };

 // Function to resize images to profile pic ready format 
 async function mkProfile(fName, dirToFile){
    let dir = dirToFile+'\\'
    let filename = fName
    let originalfile = dir+filename
    let renamefile = dir+'_'+filename
    console.log(renamefile)
    await sharp(originalfile)
        .resize(253,169,{
            fit:'contain'
        })
        .toFile(renamefile)
        .then(() => {
            console.log('Done!')
            fs.unlink(originalfile, function(err) {
                if(err){
                    console.log(err)
                }
            })
            fs.renameSync(renamefile, originalfile)
        })
        return message = await Promise.resolve('Is OKE')
}
 
 
 module.exports = {  validSub : validSubscription,
                     formatDate : formatDate,
                     nameFormat: nameEntry,
                     imgResize : mkProfile
                 }
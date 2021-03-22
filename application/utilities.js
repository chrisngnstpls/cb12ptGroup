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

async function constructUserModel(user,details){
    let userModel = {
        email : await user.email,
        fname:await user.firstName,
        lname:await user.lastName,
        id:await user.id,
        balance: await user.money,
        isAdmin:await details.isAdmin,
        isTrainer:await details.isTrainer,
        isCustomer:await details.isCustomer

    }
    return model = await Promise.resolve(userModel)
}

async function updateMembership(req,res,next){
    
    const NewUserMembership = require('../classes/newuserMembership');
    console.log('Now updating membership.')
    let id = await req.body.id;
    let startDate = await req.body.startDate;
    let price = await req.body.price;
    let isCancelled = await req.body.isCancelled;
    let userId = await req.session.user.id;
    let membershipId = await req.body.id;
   
    /**
     * updated with Class corrections 
     */
    
    let _newMembership = new NewUserMembership(id,startDate, price, isCancelled, userId, membershipId);
    console.log('Updating with :' ,_newMembership);
    let newEndDate = new Date();
    newEndDate = formatDate(newEndDate)
    let updatedMembership  = await UserMembership.updateOne({id:req.session.user.lastMembershipId}).set({isCancelled:1, endDate:newEndDate})
    
    var newUserMembership = await UserMembership.create({
        startDate: _newMembership.startDate,
        endDate: _newMembership.endDate,
        price: _newMembership.price,
        isCancelled: _newMembership.isCancelled,
        userId: _newMembership.userId,
        membershipId: _newMembership.id
    }).fetch()
    
    const [isActive, days] =  validSubscription(newEndDate, newUserMembership.endDate)

    req.session.user.lastMembershipId = await newUserMembership.id
    req.session.user.hasActiveMembership = await isActive
    req.session.user.dueDays = await days
    req.session.user.membershipName =  req.body.name
    req.session.membershipEndDate = await newUserMembership.endDate

    return message = await Promise.resolve('Updated OK.')
}
 
 module.exports = {  validSub : validSubscription,
                     formatDate : formatDate,
                     nameFormat: nameEntry,
                     imgResize : mkProfile,
                     userModel : constructUserModel,
                     updateMembership : updateMembership
                 }
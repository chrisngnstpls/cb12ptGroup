
class DetailedView{
    constructor(email, firstName, lastName, startDate, endDate,location){
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._stardDate = startDate;
        this._endDate = endDate
        this._location = location
    
    }


    get lastName(){
        return this._lastName
    }
    set lastName(name){
        this._lastName = name;
    }
    get firstName(){
        return this._firstName
    }
    set firstName(name){
        this._firstName = name
    }
    get email(){
        return this._email
    }
    set email(email){
        this._email = email
    }
    get startDate(){
        return this._stardDate
    }
    set startDate(date){
        this._stardDate = date;
    }
    get endDate(){
        return this._endDate
    }
    set endDate(date){
        this._endDate = date;
    }
    get location(){
        return this._location
    }
    set location(loc){
        this._location = loc
    }
}

module.exports = DetailedView
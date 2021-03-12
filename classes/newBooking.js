const dateFormat = require('dateformat')

class NewBooking {
    constructor(location, startDate, trainerId, customerId) {
        this._location = location;
        this._startDate = startDate;
        this._trainerId = trainerId;
        this._customerId = customerId;
    }
    get location(){
        return this._location;
    }

    set location(loc){
        this._location = loc;
    }
    get startDate(){
        return this._startDate;
    }

    set startDate(date){
        this._startDate = date;
    }
    get endDate(){
        return this.calcEndDate();
    }

    // calcEndDate is a function to calculate and return the starting date + 2 hours. It uses the dateformat module included above
    
    calcEndDate(){
        let _dateTime = new Date(this.startDate);
        _dateTime.setHours(_dateTime.getHours()+2)
        let dateTime = dateFormat(_dateTime, "yyyy-mm-dd HH:MM")
        return dateTime;

    }

    /**
     * Ensuring correct format for db entry. IDs *must* be in INT format.
     * Through the use of getters we can always return the correct data type for insertion
     * but...
     * getters can not exist without setters.
     * 
    */
    
    set trainerId(id){
        this._trainerId = id;
    }
    get trainerId(){
        return parseInt(this._trainerId);
    }
    set customerId(id){
        this._customerId = id;
    }
    get customerId(){
        return parseInt(this._customerId);
    }
}

module.exports = NewBooking;

class MembershipType {
    constructor( name, typecount, description, price) {
       
        this._name = name;
        this._typecount = typecount;
        this._description = description;
        this._price = price;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName
    }
    get typecount() {
        return parseInt(this._typecount);
    }
    set typecount(newTypecount) {
        parseInt(this._typecount) = newTypecount
    }
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    get price() {
        return this._price;
        
    }
    // calcPrice(){
    //     if(this.name == 'Bronze') {
    //         price == 100;
    //     } else if (this.name == 'Silver') {
    //         price == 300;
    //     } else {
    //         price == 500;
    //     }
    //     return this._price;
    // }
    set price(newPrice) {
        this._price = newPrice;
    }
    
}

module.exports = MembershipType;
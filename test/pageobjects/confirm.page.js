class Confirm {
    //Getters
    get titlePage () {return $('#header_container > div.header_secondary_container > span')}
    get cancelBtn () {return $('#cancel')}
    get finishBtn () {return $('#finish')}
    //Methods
}

module.exports = new Confirm();
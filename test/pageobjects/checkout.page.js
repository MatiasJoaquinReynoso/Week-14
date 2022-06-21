class CheckoutPage {
    //Getters
    get titlePage () {return $('#header_container > div.header_secondary_container > span')}
    get nameInput () {return $('#first-name')}
    get lastNameInput () {return $('#last-name')}
    get zipInput () {return $('#postal-code')}
    get cancelBtn () {return $('#cancel')}
    get continueBtn () {return $('#continue')}
    get errorContainer () {return $('div.error-message-container.error')}
    get crossErrorBtn () {return $('div.error-message-container.error > h3 > button > svg')}
    //Setters
    async setName (name) {
        await this.nameInput.setValue(name);
    }
    async setLastName (lastName) {
        await this.lastNameInput.setValue(lastName);
    }
    async setZip (zip) {
        await this.zipInput.setValue(zip);
    }
    //Methods
    async buttonsClick() {
        await this.cancelBtn.click();
        await this.continueBtn.click();
        await this.crossErrorBtn.click();
    }
    async loginCheckout(name, lastName, zip) {
        await this.setName(name);
        await this.setLastName(lastName);
        await this.setZip(zip);
        await this.continueBtn.click();
    }
}

module.exports = new CheckoutPage();
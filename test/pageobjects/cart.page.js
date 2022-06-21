class CartPage {
    //Getters
    get backpackItem () {return $('.cart_list > div:nth-child(3)')}
    get boltshirtItem () {return $('.cart_list > div:nth-child(4)')}
    get backpackPrice () {return $('//*[@id="cart_contents_container"]/div/div[1]/div[3]/div[2]/div[2]/div')}
    get boltshirtPrice () {return $('//*[@id="cart_contents_container"]/div/div[1]/div[4]/div[2]/div[2]/div')}
    get removeBackpack () {return $('#remove-sauce-labs-backpack')}
    get continueBtn () {return $('#continue-shopping')}
    get checkoutBtn () {return $('#checkout')}
    //Methods
    async buttonsClick() {
        await this.removeBackpack.click();
        await this.continueBtn.click();
        await this.checkoutBtn.click();
    }
}

module.exports = new CartPage();

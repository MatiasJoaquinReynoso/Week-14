class Menus {
    //Getters
    get burgerMenu () {return $('#react-burger-menu-btn');}
    get cartMenu () {return $('#shopping_cart_container > a');}
    get browserMenu () {return $('.right_component > span > select');}
    get allitemsSidebar () {return $('#inventory_sidebar_link');}
    get aboutSidebar () {return $('#about_sidebar_link');}
    get logoutSidebar () {return $('//*[@id="logout_sidebar_link"]');}
    get resetSidebar () {return $('//*[@id="reset_sidebar_link"]');}
    get crossSidebar () {return $('//*[@id="react-burger-cross-btn"]');}
    get twitter() {return $('.social_twitter > a:nth-child(1)')};
    get facebook() {return $('.social_facebook > a:nth-child(1)')};
    get linkedin() {return $('.social_linkedin > a:nth-child(1)')};
    get openDet() {return $('#item_4_title_link > div')};
    //Methods
    async clickMenu () {
        await this.burgerMenu.click();
        await this.cartMenu.click();
        await this.browserMenu.click();
        await this.aboutSidebar.click();
        await this.logoutSidebar.click();
        await this.crossSidebar.click();
    }
}

module.exports = new Menus();
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
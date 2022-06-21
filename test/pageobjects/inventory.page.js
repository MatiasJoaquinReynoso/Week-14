class InventoryPage {
    //Getters
    get imgBackpack () {return $('#item_4_img_link > img');}
    get titleBackpack () {return $('#item_4_title_link > div');}
    get addBackpack () {return $('#add-to-cart-sauce-labs-backpack');}
    get removeBackpack () {return $('#remove-sauce-labs-backpack');}
    get imgBoltshirt () {return $('#item_1_img_link > img');}
    get titleBoltshirt () {return $('#item_1_title_link > div');}
    get addBoltshirt () {return $('#add-to-cart-sauce-labs-bolt-t-shirt');}
    get removeBoltshirt () {return $('#remove-sauce-labs-bolt-t-shirt');}
    get backBtn () {return $('#back-to-products');}
    //Methods
    open () {
        return browser.url('http://www.saucedemo.com/inventory.html')
    }
    async backToProductsClick () {
        await this.backBtn.click();
    }
    async imgClick () {
        await this.imgBackpack.click();
        await this.imgBoltshirt.click();
    }
    async addProducts () {
        await this.addBackpack.click();
        await this.addBoltshirt.click();
    }
    async removeProducts () {
        await this.removeBackpack.click();
        await this.removeBoltshirt.click();
    }
}
module.exports = new InventoryPage();
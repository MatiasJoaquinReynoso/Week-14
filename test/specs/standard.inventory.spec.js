const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const Menus = require('../pageobjects/menus.page');

describe('Inventory page test', ()=> {
        beforeEach('Redirect to inventory page after success login', async ()=> {
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
            await browser.url('https://www.saucedemo.com/inventory.html')
        });
        it('Testing ABOUT button functionality', async ()=> {
            await Menus.burgerMenu.click();
            await expect(Menus.aboutSidebar).toExist();
            await expect(Menus.aboutSidebar).toBeClickable();
            await Menus.aboutSidebar.click();
            await browser.pause(1000)
            await expect(browser).toHaveUrl('https://saucelabs.com/');
        });
        it('Testing LOGOUT button functionality', async ()=> {
            await Menus.burgerMenu.click();
            await expect(Menus.logoutSidebar).toExist();
            await browser.pause(1000);
            await Menus.logoutSidebar.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        });
        it('Testing sidebar cross functionality', async ()=> {
            await Menus.burgerMenu.click();
            await expect(Menus.crossSidebar).toExist();
            await Menus.crossSidebar.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        });
        it('Testing on click on Backpack image', async ()=> {
            await InventoryPage.imgBackpack.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id=4');
            await InventoryPage.backBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        })
        it('Testing on click Bolt T-Shirt image', async ()=> {
            await InventoryPage.imgBoltshirt.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id=1');
            await InventoryPage.backBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        })
        it('Testing on click add to cart and remove Backpack buttons', async ()=> {
            await InventoryPage.addBackpack.click();
            await expect(Menus.cartMenu).toBeDisplayed();
            await InventoryPage.removeBackpack.click();
        })
        it('Testing on click add to cart and remove Bolt T-Shirt buttons', async ()=> {
            await InventoryPage.addBoltshirt.click();
            await expect(Menus.cartMenu).toBeDisplayed();
            await InventoryPage.removeBoltshirt.click();
        })
    })
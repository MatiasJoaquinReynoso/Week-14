const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const Menus = require('../pageobjects/menus.page');
const CartPage = require('../pageobjects/cart.page');

describe('Cart shopping testing', () => {
        beforeAll('open browser', async ()=> {
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
            await browser.url('https://www.saucedemo.com/inventory.html')
        });
        it('Add items to the cart', async ()=> {
            await InventoryPage.addBackpack.click();
            await InventoryPage.addBoltshirt.click();
        });
        it('Testing if items exist', async ()=> {
            await Menus.cartMenu.click();
            await expect(CartPage.backpackItem).toExist();
            await expect(CartPage.boltshirtItem).toExist();
        });
        it('Test the price of the items', async ()=> {
            await expect(CartPage.backpackPrice).toHaveTextContaining('29.99');
            await expect(CartPage.boltshirtPrice).toHaveTextContaining('15.99');
        });
        it('Test the remove button', async ()=> {
            await CartPage.removeBackpack.click();
            await expect (CartPage.backpackItem).not.toBeDisabled();
        })
        it('First check the redirection of the button', async ()=> {
            await CartPage.continueBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        });
        it('Second check the redirection of the button', async ()=> {
            await Menus.cartMenu.click();
            await CartPage.checkoutBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')
            await browser.pause(1000);
        });
    })
const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const Menus = require('../pageobjects/menus.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const Confirm = require('../pageobjects/confirm.page');

describe('Checking the confirm order page', ()=> {
        beforeAll('Redirect to the confirm order page', async ()=> {
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
            await InventoryPage.addBackpack.click();
            await Menus.cartMenu.click();
            await CartPage.checkoutBtn.click();
            await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
        });
        it('Testing Title', async ()=> {
            await expect(Confirm.titlePage).toHaveTextContaining('CHECKOUT: OVERVIEW');
        });
        it('Testing cancel button redirect to the inventory page', async ()=> {
            await Confirm.cancelBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        });
        it('Testing the FINISH button redirect to the buy order success page', async ()=> {
            await Menus.cartMenu.click();
            await CartPage.checkoutBtn.click();
            await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
            await Confirm.finishBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')
        });
    });

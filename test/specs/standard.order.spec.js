const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const Menus = require('../pageobjects/menus.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const Confirm = require('../pageobjects/confirm.page');
const Order = require('../pageobjects/order.page');

describe('Checking the confirm order page', ()=> {
        beforeAll('Redirect to the confirm order page', async ()=> {
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
            await InventoryPage.addBackpack.click();
            await Menus.cartMenu.click();
            await CartPage.checkoutBtn.click();
            await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
            await Confirm.finishBtn.click();
        });
        it('Testing Title', async ()=> {
            await expect(Confirm.titlePage).toHaveTextContaining('CHECKOUT: COMPLETE!');
        });
        it('Testing Bot Image to be displayed', async () => {
            await expect(Order.botImg).toBeDisplayed()
        })
        it('Testing Header text', async ()=> {
            await expect(Order.h2Text).toHaveText('THANK YOU FOR YOUR ORDER');
        });
        it('Testing the BACK HOME button redirect to the inventory page', async ()=> {
            await Order.backBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        });
    });
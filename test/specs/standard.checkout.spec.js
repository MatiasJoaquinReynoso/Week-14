const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const Menus = require('../pageobjects/menus.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');

describe('Check the checkout page', ()=> {
        beforeAll('Redirect to the checkout page', async ()=> {
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
            await InventoryPage.addBackpack.click();
            await Menus.cartMenu.click();
            await CartPage.checkoutBtn.click();
        });
        it('Testing Title', async ()=> {
            await expect(CheckoutPage.titlePage).toHaveTextContaining('CHECKOUT: YOUR INFORMATION');
        });
        it('Empty first name should display error', async ()=> {
            await CheckoutPage.setName('');
            await CheckoutPage.continueBtn.click();
            await expect(CheckoutPage.errorContainer).toHaveText('Error: First Name is required');
            await CheckoutPage.crossErrorBtn.click();
            await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
        });
        it('Empty last name should display error', async ()=> {
            await CheckoutPage.setName('Matias');
            await CheckoutPage.setLastName('');
            await CheckoutPage.continueBtn.click();
            await expect(CheckoutPage.errorContainer).toHaveText('Error: Last Name is required');
            await CheckoutPage.crossErrorBtn.click();
            await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
        });
        it('Empty ZIP code should display error', async ()=> {
            await CheckoutPage.setName('Matias');
            await CheckoutPage.setLastName('Reynoso');
            await CheckoutPage.setZip('');
            await CheckoutPage.continueBtn.click();
            await expect(CheckoutPage.errorContainer).toHaveText('Error: Postal Code is required');
            await CheckoutPage.crossErrorBtn.click();
            await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
            });
        it('Testing cancel button redirect to the cart', async ()=> {
            await CheckoutPage.cancelBtn.click();
            await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        });
        it('Testing the continue button redirect to the confirm buy order', async ()=> {
            await CartPage.checkoutBtn.click()
            await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
            await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
        });
    });

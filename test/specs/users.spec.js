const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const Menus = require('../pageobjects/menus.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const Confirm = require('../pageobjects/confirm.page');
const Order = require('../pageobjects/buyorder.page');

describe ('All users tests',() => {

    beforeAll('open browser',()=> {
        browser.url('https://www.saucedemo.com/')
    })
    // STANDARD_USER TESTS
    it('empty username should display error', async () => {
        await LoginPage.login('', 'secret_sauce');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username is required');
    })
    it('invalid username should display error', async () => {
        await LoginPage.login('invalid', 'secret_sauce');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    it('invalid password should display error', async () => {
        await LoginPage.login('standard_user', 'invalid');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    it('verify Bot Image to be displayed', async () => {
        await expect(LoginPage.botImg).toBeDisplayed()
    })
    it('verify login logo to be displayed', async () => {
        await expect(LoginPage.loginLogo).toBeDisplayed()
    })
    it('Login success', async () => {
        await LoginPage.login('standard_user','secret_sauce');
    })
    // INVENTORY TESTS
    it('Testing ABOUT button functionality', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.burgerMenu.click();
        await expect(Menus.aboutSidebar).toExist();
        await expect(Menus.aboutSidebar).toBeClickable();
        await Menus.aboutSidebar.click();
        await browser.pause(1000)
        await expect(browser).toHaveUrl('https://saucelabs.com/');
    })
    it('Testing LOGOUT button functionality', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.burgerMenu.click();
        await expect(Menus.logoutSidebar).toExist();
        await browser.pause(1000);
        await Menus.logoutSidebar.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    })
    it('Testing X from sidebar functionality', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.burgerMenu.click();
        await expect(Menus.crossSidebar).toExist();
        await Menus.crossSidebar.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
    it('Testing on click Backpack image', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
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
    // // CART SHOPPING TESTS
    it('Add items to the cart', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await InventoryPage.addBackpack.click();
        await InventoryPage.addBoltshirt.click();
        await Menus.cartMenu.click();
    })
    it('Testing if items exist', async ()=> {
        await expect(CartPage.backpackItem).toExist();
        await expect(CartPage.boltshirtItem).toExist();
    })
    it('Test the price of the items', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await expect(CartPage.backpackPrice).toHaveTextContaining('29.99');
        await expect(CartPage.boltshirtPrice).toHaveTextContaining('15.99');
    })
    it('Test the title should be YOUR CART', async ()=> {
        await expect(CartPage.cartTitle).toHaveTextContaining('YOUR CART');
    })
    it('Test the title for label', async ()=> {
        await expect(CartPage.cartLabel).toHaveTextContaining('Sauce Labs Backpack');
    })
    it('Test the text for label', async ()=> {
        await expect(CartPage.labelText).toHaveTextContaining('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    })
    it('Test the remove button', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await CartPage.removeBackpack.click();
        await expect (CartPage.backpackItem).not.toBeDisabled();
    })
    it('First check the redirection of the button', async ()=> {
        await CartPage.continueBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })
    it('Second check the redirection of the button', async ()=> {
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await CartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')
        await browser.pause(1000);
    })
    // CHECKOUT TESTS
    it('Testing Title', async ()=> {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await CartPage.checkoutBtn.click();
        await expect(CheckoutPage.titlePage).toHaveTextContaining('CHECKOUT: YOUR INFORMATION');
    })
    it('Empty first name should display error', async ()=> {
        await CheckoutPage.setName('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: First Name is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
    })
    it('Empty last name should display error', async ()=> {
        await CheckoutPage.setName('Matias');
        await CheckoutPage.setLastName('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: Last Name is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
    })
    it('Empty ZIP code should display error', async ()=> {
        await CheckoutPage.setName('Matias');
        await CheckoutPage.setLastName('Reynoso');
        await CheckoutPage.setZip('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: Postal Code is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
        })
    it('Testing cancel button redirect to the cart', async ()=> {
        await CheckoutPage.cancelBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
    })
    it('Testing the continue button redirect to the confirm buy order', async ()=> {
        await CartPage.checkoutBtn.click()
        await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
    })
    //  CONFIRM VALIDATIONS TESTS
    it('Testing Title', async ()=> {
        await expect(Confirm.titlePage).toHaveTextContaining('CHECKOUT: OVERVIEW');
    })
    it('Testing cancel button redirect to the inventory page', async ()=> {
        await Confirm.cancelBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })
    it('Testing the FINISH button redirect to the buy order success page', async ()=> {
        await Menus.cartMenu.click();
        await CartPage.checkoutBtn.click();
        await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
        await Confirm.finishBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')
    })
    // ORDER BUY SUCCESS TESTS
    it('Testing Title', async ()=> {
        await expect(Confirm.titlePage).toHaveTextContaining('CHECKOUT: COMPLETE!');
    })
    it('Testing Bot Image to be displayed', async () => {
        await expect(Order.botImg).toBeDisplayed()
    })
    it('Testing Header text', async ()=> {
        await expect(Order.h2Text).toHaveText('THANK YOU FOR YOUR ORDER');
    })
    it('Testing the BACK HOME button redirect to the inventory page', async ()=> {
        await Order.backBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })
    // HERE BEGIN THE TETS FROM LOCKED_OUT_USER
    it('empty username should display error', async () => {
        await LoginPage.open();
        await LoginPage.login('', 'secret_sauce');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username is required');
    })
    it('invalid username should display error', async () => {
        await LoginPage.login('invalid', 'secret_sauce');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    it('invalid password should display error', async () => {
        await LoginPage.login('locked_out_user', 'invalid');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    it('Login success', async () => {
        await LoginPage.login('locked_out_user','secret_sauce');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })
    // HERE BEGIN THE TETS FROM PROBLEM_USER TESTS
    it('Login success', async () => {
        await LoginPage.open();
        await LoginPage.login('problem_user','secret_sauce');
    })
    it('Testing img content', async () => {
        const dogSrc = await $('#item_4_img_link > img').getAttribute('src');
        await expect(dogSrc).toBe('/static/media/sl-404.168b1cce.jpg');
    })
    it('Page should be refreshed', async () => {
        await browser.refresh();
        await browser.pause(800);
    })
    it('When click to open the details of the backpack have wrong redirection', async () => {
        await Menus.openDet.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id=5');
    })
    it('ABOUT button redirect to wrong url', async ()=> {
        await Menus.burgerMenu.click();
        await expect(Menus.aboutSidebar).toExist();
        await expect(Menus.aboutSidebar).toBeClickable();
        await Menus.aboutSidebar.click();
        await browser.pause(1000)
        await expect(browser).toHaveUrl('https://saucelabs.com/error/404');
    })
    it('Social media buttons', async () => {
        await LoginPage.open();
        await LoginPage.login('problem_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await expect(Menus.twitter).toBeClickable();
        await expect(Menus.twitter).toHaveHref('https://twitter.com/saucelabs');
        await expect(Menus.facebook).toBeClickable();
        await expect(Menus.facebook).toHaveHref('https://www.facebook.com/saucelabs');
        await expect(Menus.linkedin).toBeClickable();
        await expect(Menus.linkedin).toHaveHref('https://www.linkedin.com/company/sauce-labs/');
    })
    it('Add items to the cart from PROBLEM USER login', async ()=> {
        await LoginPage.open();
        await LoginPage.login('problem_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await InventoryPage.addBackpack.click();
        await InventoryPage.addBoltshirt.click();
        await Menus.cartMenu.click();
    })
    it('Testing if items exist', async ()=> {
        await expect(CartPage.backpackItem).toExist();
    })
    it('Test the price of the items', async ()=> {
        await LoginPage.open();
        await LoginPage.login('problem_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await expect(CartPage.backpackPrice).toHaveTextContaining('29.99');
    })
    it('Test the title should be YOUR CART', async ()=> {
        await expect(CartPage.cartTitle).toHaveTextContaining('YOUR CART');
    })
    it('Test the title for label', async ()=> {
        await expect(CartPage.cartLabel).toHaveTextContaining('Sauce Labs Backpack');
    })
    it('Test the text for label', async ()=> {
        await expect(CartPage.labelText).toHaveTextContaining('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    })
    it('Test the remove button', async ()=> {
        await LoginPage.open();
        await LoginPage.login('problem_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await CartPage.removeBackpack.click();
        await expect (CartPage.backpackItem).not.toBeDisabled();
    })
    it('First check the redirection of the button', async ()=> {
        await CartPage.continueBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })
    it('Second check the redirection of the button', async ()=> {
        await browser.url('https://www.saucedemo.com/inventory.html')
        await Menus.cartMenu.click();
        await CartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')
        await browser.pause(1000);
    })
    it('Testing Title', async ()=> {
        await expect(CheckoutPage.titlePage).toHaveTextContaining('CHECKOUT: YOUR INFORMATION');
    })
    it('Empty first name should display error', async ()=> {
        await CheckoutPage.setName('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: First Name is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
    })
    it('Empty last name should display error', async ()=> {
        await CheckoutPage.setName('Matias');
        await CheckoutPage.setLastName('');
        await CheckoutPage.setZip('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: Last Name is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
    })
    it('Testing cancel button redirect to the cart', async ()=> {
        await CheckoutPage.cancelBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
    })
    it('Testing LOGOUT button functionality', async ()=> {
        await LoginPage.open();
        await LoginPage.login('problem_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await InventoryPage.addBackpack.click();
        await Menus.cartMenu.click();
        await CartPage.checkoutBtn.click();
        await Menus.burgerMenu.click();
        await expect(Menus.logoutSidebar).toExist();
        await browser.pause(1000);
        await Menus.logoutSidebar.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    })
    // HERE BEGIN THE TETS FROM PERFORMANCE_GLITCH_USER
    it('Login success', async () => {
        await LoginPage.login('performance_glitch_user','secret_sauce');
    })
    it('should detect when element is visible', async () => {
        const elem = await $('#item_4_img_link > img')
        await elem.waitForDisplayed({ timeout: 5000 });
    })
    it('The title from inventory should be displayed after 8 seconds delay when click continue-shopping', async () => {
        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        await browser.url('https://www.saucedemo.com/inventory.html')
        await InventoryPage.imgBackpack.click();
        await Menus.cartMenu.click();
        await browser.url('https://www.saucedemo.com/cart.html')
        await CartPage.continueBtn.click();
        const title = await $('.header_secondary_container > span')
        await title.waitForDisplayed({ timeout: 8000 });
    })
    it('Add items to the cart', async ()=> {
        await Menus.cartMenu.click();
    })
    it('Testing Title', async ()=> {
        await browser.url('https://www.saucedemo.com/cart.html')
        await expect(CartPage.cartTitle).toHaveTextContaining('YOUR CART');
    })
    it('Testing checkout button functionality', async ()=> {
        await CartPage.checkoutBtn.click();
    })
    it('Empty first name should display error', async ()=> {
        await browser.url('https://www.saucedemo.com/checkout-step-one.html')
        await CheckoutPage.setName('');
        await CheckoutPage.continueBtn.click();
        await CheckoutPage.setZip('');
        await expect(CheckoutPage.errorContainer).toHaveText('Error: First Name is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
    })
    it('Empty last name should display error', async ()=> {
        await CheckoutPage.setName('Matias');
        await CheckoutPage.setLastName('');
        await CheckoutPage.setZip('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: Last Name is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
    })
    it('Empty ZIP code should display error', async ()=> {
        await CheckoutPage.setName('Matias');
        await CheckoutPage.setLastName('Reynoso');
        await CheckoutPage.setZip('');
        await CheckoutPage.continueBtn.click();
        await expect(CheckoutPage.errorContainer).toHaveText('Error: Postal Code is required');
        await CheckoutPage.crossErrorBtn.click();
        await expect(CheckoutPage.errorContainer).not.toBeDisplayed();
        })
    it('Testing cancel button redirect to the cart', async ()=> {
        await CheckoutPage.cancelBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
    })
    it('Testing the continue button redirect to the confirm buy order', async ()=> {
        await CartPage.checkoutBtn.click()
        await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
    })
    it('Testing Title', async ()=> {
        await expect(Confirm.titlePage).toHaveTextContaining('CHECKOUT: OVERVIEW');
    })
    it('Testing cancel button redirect to the inventory page', async ()=> {
        await Confirm.cancelBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })
    it('Testing the FINISH button redirect to the buy order success page', async ()=> {
        await Menus.cartMenu.click();
        await CartPage.checkoutBtn.click();
        await CheckoutPage.loginCheckout('Matias', 'Reynoso', '2000');
        await Confirm.finishBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')
    })
    it('Testing Title', async ()=> {
        await expect(Confirm.titlePage).toHaveTextContaining('CHECKOUT: COMPLETE!');
    })
    it('Testing Bot Image to be displayed', async () => {
        await expect(Order.botImg).toBeDisplayed()
    })
    it('Testing Header text', async ()=> {
        await expect(Order.h2Text).toHaveText('THANK YOU FOR YOUR ORDER');
    })
    it('Click back home button redirect to inventory and after 8 seconds should display the title', async ()=> {
        await Order.backBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        const title = await $('.header_secondary_container > span')
        await title.waitForDisplayed({ timeout: 8000 });
    })
})

const LoginPage = require('../pageobjects/login.page');

describe ('All users testing',() => {

    beforeAll('open browser',()=> {
        browser.url('https://www.saucedemo.com/')
    })
    // LOCKED_OUT_USER
    it('empty username should display error', async () => {
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
    // PERFORMANCE_GLITCH_USER
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
        await LoginPage.login('performance_glitch_user', 'invalid');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    it('verify Bot Image to be displayed', async () => {
        await expect(LoginPage.botImg).toBeDisplayed()
    })
    it('verify login logo to be displayed', async () => {
        await expect(LoginPage.loginLogo).toBeDisplayed()
    })
    it('Login success', async () => {
        await LoginPage.login('performance_glitch_user','secret_sauce');
    })
    it('should detect when element is visible', async () => {
        const elem = await $('#item_4_img_link > img')
        await elem.waitForDisplayed({ timeout: 5000 });
    })
    // PROBLEM_USER
    it('Login success', async () => {
        await LoginPage.open();
        await LoginPage.login('problem_user','secret_sauce');
    })
    it('Testing img content', async () => {
        const dogSrc = await $('#item_4_img_link > img').getAttribute('src');
        await expect(dogSrc).toBe('/static/media/sl-404.168b1cce.jpg');
    })
    // STANDARD_USER
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
})
const LoginPage = require('../pageobjects/login.page')

describe ('Performance glitch user login testing',() => {

    beforeAll('open browser',()=> {
        browser.url('https://www.saucedemo.com/')
    })
    it('empty username should display error', async () => {
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
})

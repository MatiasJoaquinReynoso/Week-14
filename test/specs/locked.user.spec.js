const LoginPage = require('../pageobjects/login.page')

describe ('Locked out user login testing',() => {

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
        await LoginPage.login('locked_out_user', 'invalid');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    it('Login success', async () => {
        await LoginPage.login('locked_out_user','secret_sauce');
        await expect(LoginPage.errorContainer).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })
})

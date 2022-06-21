const LoginPage = require('../pageobjects/login.page')

describe ('Problem user login testing',() => {

    beforeAll('open browser',()=> {
        browser.url('https://www.saucedemo.com/')
    })
    it('Login success', async () => {
        await LoginPage.login('problem_user','secret_sauce');
    })
    it('img content', async () => {
        const dogSrc = await $('#item_4_img_link > img').getAttribute('src');
        await expect(dogSrc).toBe('/static/media/sl-404.168b1cce.jpg');
    })
})
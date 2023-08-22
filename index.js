const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config()

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const getRandomDelay = (min, max) => {
    return Math.random() * (max - min) + min;
}

const humanType = async (element, text) => {
    for (let char of text) {
        await element.sendKeys(char);
        const delay = getRandomDelay(100, 200);  // Random delay between 100ms and 200ms
        await sleep(delay);
    }
}

async function SignIn() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://portal.offsec.com/library/all');
        const expectedSignInButton = By.className("button-text text-decoration-none letter-spacing-0 text-left text-uppercase border-none mr-3 py-2")
        const signin = await driver.wait(until.elementLocated(expectedSignInButton), 10000);
        signin.click()
        const expectedUsernameInput = By.id("username")
        const usernameInput = await driver.wait(until.elementLocated(expectedUsernameInput), 10000);
        await humanType(usernameInput, process.env.USERNAME)
        const expectedPasswordInput = By.id("password")
        const passwordInput = await driver.wait(until.elementLocated(expectedPasswordInput), 10000);
        await humanType(passwordInput, process.env.PASSWORD)
        await sleep(300)
        const expectedSignInButton2 = By.className("btn font-weight-normal px-5 btn-primary btn-lg")
        const signInput = await driver.wait(until.elementLocated(expectedSignInButton2), 10000);
        signInput.click()

        //menu-dropdown position-relative text-main-color d-flex align-items-center justify-content-center cursor-pointer header-main-link text-decoration-none px-5

    } finally {
        // await driver.quit();
    }
}
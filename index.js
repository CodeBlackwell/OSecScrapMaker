const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

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
        const expectedSignInButton = By.className("button-text text-decoration-none letter-spacing-0 text-left text-uppercase border-none mr-3 py-2");
        const signin = await driver.wait(until.elementLocated(expectedSignInButton), 10000);
        signin.click();
        const expectedUsernameInput = By.id("username");
        const usernameInput = await driver.wait(until.elementLocated(expectedUsernameInput), 10000);
        await humanType(usernameInput, process.env.USERNAME);
        const expectedPasswordInput = By.id("password");
        const passwordInput = await driver.wait(until.elementLocated(expectedPasswordInput), 10000);
        await humanType(passwordInput, process.env.PASSWORD);
        await sleep(500);
        const expectedSignInButton2 = By.className("btn font-weight-normal px-5 btn-primary btn-lg");
        const signInput = await driver.wait(until.elementLocated(expectedSignInButton2), 10000);
        signInput.click();
        return driver;
    } catch (error) {
        console.error("Error in SignIn:", error);
        await driver.quit();
    }
}

async function SelectCourse(driver, courseName) {
    try {
        const expectedCourseDropdown = By.className("menu-dropdown position-relative text-main-color d-flex align-items-center justify-content-center cursor-pointer header-main-link text-decoration-none px-5 open");
        const courseDropDown = await driver.wait(until.elementLocated(expectedCourseDropdown), 30000);
        courseDropDown.click();

        // Find all elements with href containing "/courses/"
        const courseLinks = await driver.findElements(By.css('a[href*="/courses/"]'));

        // Iterate over the elements and perform desired actions
        for (let link of courseLinks) {
            const hrefValue = await link.getAttribute('href');
            console.log(hrefValue);
        }
    } catch (error) {
        console.error("Error in SelectCourse:", error);
        await driver.quit();
    }
}

(async () => {
    const driver = await SignIn();
    await SelectCourse(driver, "YourCourseName");  // Replace "YourCourseName" with the desired course name
})();

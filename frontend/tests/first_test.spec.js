const { test, expect } = require('@playwright/test');
test.use({
    headless: false, slowMo: 1000
})

test("Loadpage", async ({ page }) => {
    await page.goto("http://52.23.181.75:5001/");
    await expect(page).toHaveTitle(/Aurora/);
    await expect(page).toHaveURL("http://52.23.181.75:5001/");

    const navBar = page.locator("div.navbar");
    await expect(navBar).toBeVisible();

    // await page.screenshot({ path: "loadpage.png"})
});


test("navbar contains two items", async ({ page }) => {
    await page.goto("http://52.23.181.75:5001/");

    // Use waitForSelector to ensure the elements are present
    await page.waitForSelector("div.navbar-item", { state: 'visible' });

    // Use .locator() to find all elements matching the navbar items
    const navBarItems = page.locator("div.navbar-item");

    // Check if there are exactly two matching elements
    const count = await navBarItems.count();
    expect(count).toBe(2);

    // Now, you can assert specific text or properties of these elements if needed
    const firstItem = navBarItems.first();
    const secondItem = page.locator("div.navbar-item a")

    await expect(firstItem).toHaveText("Article Topics");
    await expect(secondItem).toHaveText("Contact");

    // Capture a screenshot for documentation or debugging
    // await page.screenshot({ path: "navbar.png" });
});


test("learn more", async ({ page }) => {
    await page.goto("http://52.23.181.75:5001/");

    // Use waitForSelector to ensure the elements are present
    await page.waitForSelector("button.learn-more-button", { state: 'visible' });

    const learnMoreButton = page.locator("button.learn-more-button")
    await expect(learnMoreButton).toHaveText("Learn more")
    await learnMoreButton.click()
    await page.evaluate(() => {
        window.scrollBy(0,500)
    });
    await page.waitForSelector("#mc_embed_signup_scroll", { state: 'visible' });

    const h2 = page.locator("h2.top_signup_text1")

    await expect(h2).toHaveText("We’re working on bringing Aurora to life...")


    // Capture a screenshot for documentation or debugging
    // await page.screenshot({ path: "learnmore.png" });
});


test.only("Subscription", async ({ page }) => {
    await page.goto("http://52.23.181.75:5001/");

    // Use waitForSelector to ensure the elements are present
    await page.waitForSelector("div.mc-field-group input.email", { state: 'visible' });
    const email = page.locator("div.mc-field-group input.email");
    const button = page.locator("div.mc-field-group input.button");

    const firstItem = email.first();

    const firstButton = button.first();

    // Check if the input element exists
    expect(firstItem).not.toBeNull();
    expect(firstButton).not.toBeNull();

    await expect(firstButton).toHaveText("Subscribe")

    // Get the value of the placeholder attribute
    const placeholderValue = await(firstItem).getAttribute('placeholder');

    // Check if the placeholder attribute matches the expected value
    expect(placeholderValue).toBe('Enter your email');
    await firstItem.fill("rizzy@aa.io")
    await firstButton.click();

    // Capture a screenshot for documentation or debugging
    // await page.screenshot({ path: "subscription.png" });
});
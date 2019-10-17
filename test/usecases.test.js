const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = require("selenium-webdriver").By;

let browser;

test.describe("Me-page", async function() {
    test.beforeEach(async function(done) {
        await this.timeout(20000);
        browser = await new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

        await browser.get("https://mahm.me");
        await done();
    });

    test.afterEach(async function(done) {
        await browser.quit();
        await done();
    });

    async function goToNavLink(target) {
        await browser.findElement(By.linkText(target)).then(async function(element) {
            await element.click();
        });
    }

    async function matchUrl(target) {
       await browser.getCurrentUrl().then(async function(url) {
           await assert.ok(url.endsWith(target));
       });
   }

    async function assertH1(target) {
        await browser.findElement(By.css("h1")).then( async function(element) {
            await element.getText().then(async function(text) {
                await assert.equal(text, target);
            });
        });
    }

    test.it("Test index", async function(done) {
    // Check correct title
        await browser.getTitle().then(async function(title) {
            await assert.equal(title, "JSRamverk");
        });
        await done();
    });

    test.it("Test go to Login", async (done) => {
        // try use nav link
        await goToNavLink("Login");
        await browser.sleep(1000)
        await assertH1("Login here");
        await matchUrl("/login");
        var username = await browser.findElement(By.name("username"))
        await username.sendKeys("tjena@hej.se")
        var password = await browser.findElement(By.name("password"))
        await password.sendKeys("tjenahej")
        var button = await browser.findElement(By.name("submit"))
        await button.click();
        await browser.sleep(2000);
        await browser.navigate().refresh();
        var header = await browser.findElement(By.tagName("h3"));
        var string = await header.getText();
        await assert.equal(string, "You are logged in as tjena!")
        await done();
    });

    test.it("Go to reports", async (done) => {
        await goToNavLink("Reports");
        await browser.sleep(1000);
        await assertH1("Reports");
        await matchUrl("reports");
        button = await browser.findElement(By.xpath("//a[contains(.,'Week 1')]"))
        await button.click();
        await browser.sleep(1000);
        var report = await browser.findElement(By.tagName("h2"));
        string = await report.getText();
        await assert.equal(string, "How to install this project")
        await done();
    });

    test.it("Register", async (done) => {
        await goToNavLink("Register");
        await browser.sleep(1000);
        await assertH1("Register here");
        await matchUrl("register");

        var firstname = await browser.findElement(By.name("firstname"));
        await firstname.sendKeys("Yeet");
        string = await firstname.getAttribute("value");
        await assert.equal(string, "Yeet");

        var lastname = await browser.findElement(By.name("lastname"));
        await lastname.sendKeys("Yeeters");
        string = await lastname.getAttribute("value");
        await assert.equal(string, "Yeeters");

        var password = await browser.findElement(By.name("password"));
        await password.sendKeys("yeeters");
        string = await password.getAttribute("value");
        await assert.equal(string, "yeeters");

        var email = await browser.findElement(By.name("email"));
        await email.sendKeys("yeet@yeetson.se");
        string = await email.getAttribute("value");
        await assert.equal(string, "yeet@yeetson.se");

        var year = await browser.findElement(By.name("year"));
        await year.sendKeys("2002");
        string = await year.getAttribute("value");
        await assert.equal(string, "2002");

        var month = await browser.findElement(By.name("month"));
        await month.sendKeys("April");
        string = await month.getAttribute("value");
        await assert.equal(string, "April");

        var day = await browser.findElement(By.name("day"));
        await day.sendKeys("20");
        string = await day.getAttribute("value");
        await assert.equal(string, "20");

        await done();
    })
});

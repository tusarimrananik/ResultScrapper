const puppeteer = require('puppeteer');


(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    }); // Set to true for headless mode

    var [page] = await browser.pages();
    // Navigate to the page with the form
    await page.setDefaultNavigationTimeout(60000); // Sets a 60-second timeout globally

    await page.goto('http://www.educationboardresults.gov.bd/'); // Replace with your form page URL

    // Wait for the body element to be present
    await page.waitForSelector('body');
    // Simulate a click at coordinates (0, 0) or any other point in the page

    // Select the Name of Examination
    await page.select('#exam', 'hsc'); // Use the value of the option you want to select
    // Select the Year of Examination
    await page.select('#year', '2023'); // Use the value of the option you want to select
    // Select the Name of Board
    await page.select('#board', 'rajshahi'); // Use the value of the option you want to select

    await page.type('#roll', '106369'); // Replace with actual roll number
    await page.type('#reg', '1812628169'); // R

    const result = await page.evaluate(() => {
        const element = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr > td:nth-child(2) > fieldset > table > tbody > tr:nth-child(7) > td:nth-child(2)');
        const expression = element.innerText; // Get the inner text
        return eval(expression); // Evaluate the mathematical expression
    });

    await page.type('#value_s', result.toString()); // R

    await page.click('#button2');


    await page.waitForSelector('.black12 tr:nth-child(1) td:nth-child(4)');

    await page.waitForSelector('.black12 tr:nth-child(2) td:nth-child(4)');

    await page.waitForSelector('.black12 tr:nth-child(3) td:nth-child(4)');

    await page.waitForSelector('.black12 tr:nth-child(5) td:nth-child(4)');

    await page.waitForSelector('.black12 tr:nth-child(6) td:nth-child(2)');




    const information = await page.evaluate(() => {

        function extractInfo() {
            const info = {};



            info.name = document.querySelector(".black12 tr:nth-child(1) td:nth-child(4)").innerText;

            info.father = document.querySelector(".black12 tr:nth-child(2) td:nth-child(4)").innerText;

            info.mother = document.querySelector(".black12 tr:nth-child(3) td:nth-child(4)").innerText;

            info.institute = document.querySelector(".black12 tr:nth-child(5) td:nth-child(4)").innerText;
            info.gpa = document.querySelector(".black12 tr:nth-child(6) td:nth-child(2)").innerText;





            return info;
        }

        return extractInfo();
    })
    console.log(information);




})();
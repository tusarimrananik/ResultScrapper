const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });



    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    var [page] = await browser.pages();
    await page.setDefaultNavigationTimeout(60000);
    let roll = 109343 - 2;
    let reg = 1812628169 - 2;

    await page.goto('http://www.educationboardresults.gov.bd/');


    for (let i = 0; i < 500; i++) {
        await page.waitForSelector('body');
        await page.select('#exam', 'ssc_voc');
        await page.select('#year', '2021'); //
        await page.select('#board', 'rajshahi');
        await page.type('#roll', `${(roll).toString()}`);
        // await wait(3000);
        await page.type('#reg', `${(reg).toString()}`); // R
        // await wait(3000);
        const result = await page.evaluate(() => {
            const element = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr > td:nth-child(2) > fieldset > table > tbody > tr:nth-child(7) > td:nth-child(2)');
            const expression = element.innerText;
            return eval(expression);
        });
        await page.type('#value_s', result.toString());
        await page.click('#button2');



        let findName;
        try {
            findName = await page.waitForSelector('.black12 tr:nth-child(1) td:nth-child(4)', { timeout: 500 });
        } catch (error) {
            findName = false;
        }
        if (findName) {
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
            information.roll = roll
            information.reg = reg
            console.log(information);
            await page.reload();
            roll++;
            reg++;
        } else {
            reg++;
            // await page.goto('http://www.educationboardresults.gov.bd/');
        }


    }


})();
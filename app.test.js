const puppeteer = require('puppeteer');

test('should create an element with text and correct class', async () => {
    const pti = require('puppeteer-to-istanbul')
    const browser = await puppeteer.launch({
      headless: true,
      // slowMo: 80,
       //args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await Promise.all([
        page.coverage.startJSCoverage(),
       // page.coverage.startCSSCoverage()
      ]);
    await page.goto(
      'http://127.0.0.1:5500/index.html'
    );
    
    //first click
    let oneOrZero = (Math.random()>=0.5)? 1 : 0;
    if(oneOrZero==0){
    await page.click('#start-btn');
    }else{
        await page.click('#multi-btn');
    }

    while(true){
        let ran=Math.floor(Math.random() * (6 - 0)) + 0;
        switch(ran){
            case 0:
                if(await page.$('#answer0')!==null){
                    await page.click('#answer0');
                }
                break;
            case 1:
                if(await page.$('#answer1')!==null){
                    await page.click('#answer1');
                }
                break;
            case 2:
                if(await page.$('#answer2')!==null){
                    await page.click('#answer2');
                }
                break;
            case 3:
                if(await page.$('#answer3')!==null){
                    await page.click('#answer3');
                }
                break;
            case 4:
                if(await page.$eval('#skip-btn',el=>{
                    return !el.classList.contains('hide');
                })){
                    await page.click('#skip-btn');
                }
                break;
            case 5:
                if(await page.$eval('#fifty-btn',el=>{
                    return !el.classList.contains('hide');
                })){
                    await page.click('#fifty-btn');
                }
                break;
        }


        if(await page.$eval('#next-btn',el=>{
            return !el.classList.contains('hide');
        })){
            await page.click('#next-btn');
            continue;
        }

        if(await page.$eval('#result-btn',el=>{
            return !el.classList.contains('hide');
        })){
            await page.click('#result-btn');
            break;
        }
    }
    const [jsCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        //page.coverage.stopCSSCoverage(),
      ]);
      pti.write([...jsCoverage], { includeHostname: true , storagePath: './.nyc_output' })
    await browser.close()
  }, 10000);
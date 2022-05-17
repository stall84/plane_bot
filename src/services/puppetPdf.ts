/**
 * @description Testing different headless-browser options.
 * @note Originally tried the Chrome remote interface. But looking at utilizing puppeteer instead
 */
const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");

export const puppetPdf = async () => {

  try {
    const browser = await puppeteer.launch({
      executablePath: await chrome.executablePath,
      args: chrome.args
  });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      'upgrade-insecure-requests': '1',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
    await page.goto("https://www.controller.com/listings/search?Category=6&ModelGroup=CHEROKEE&Manufacturer=PIPER", {
      waitUntil: "networkidle2",
    });
    //    await page.pdf({ path: 'hn.pdf', format: 'a4' });
    let pdf = await page.pdf({ format: "a4" })
  
    await browser.close();
    return pdf;

  } catch (error) {
    console.error('There was an error running puppeteer : ', error);    
  }

};



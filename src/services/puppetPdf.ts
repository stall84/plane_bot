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



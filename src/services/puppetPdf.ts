/**
 * @description Testing different headless-browser options.
 * @note Originally tried the Chrome remote interface. But looking at utilizing puppeteer instead
 */
import * as puppeteer from "puppeteer-core";

export const puppetPdf = async () => {

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com", {
      waitUntil: "networkidle2",
    });
    //    await page.pdf({ path: 'hn.pdf', format: 'a4' });
    let pdf = await page.pdf({ format: "a4" })
      .then((data) => console.log('data from puppetPDF function : ', data))
      .catch((err) => console.error('oh fk... ', err))
  
    await browser.close();
    return pdf;

  } catch (error) {
    console.error('There was an error running puppeteer : ', error);    
  }

};



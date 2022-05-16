const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    try {
        const { queryStringParameters } = event;
        if (!queryStringParameters || !queryStringParameters.url || !queryStringParameters.screen) return { statusCode: 403 , body: JSON.stringify({message: 'Missing queryparams on request'})}
    
        const { url } = queryStringParameters;
        const [ width, height ] = queryStringParameters.screen.split(",");
    
        if ( !width || !height ) return { statusCode: 403, body: JSON.stringify({message: 'Missing height or width on request'})}
    
        const browser = await puppeteer.launch({
            executablePath: await chrome.executablePath,
            args: chrome.args
        });
    
        const page = await browser.newPage();
        await page.setViewport({
            width: Number(width),
            height: Number(height)
        });
    
        await page.goto(url);
        const screenshot = await page.screenshot({ encoding: "base64" })
    
        return {
            statusCode: 200,
            body: `<img src="data:image/png;base64,${screenshot}">`,
            headers: { 'Content-Type': 'text/html' }
        }
    } catch (error) {
        return {
            statusCode: 501,
            body: JSON.stringify({message: `Error running capture : ${error}`})
        }
    }

}
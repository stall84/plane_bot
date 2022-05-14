import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as cheerio from 'cheerio';
import * as CDP from 'chrome-remote-interface';


export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const content: any = [];
    
    try {
        const response = await fetch('https://www.controller.com/listings/search?Category=6&ModelGroup=CHEROKEE&Manufacturer=PIPER');
        const data = await response.text();
        const $ = cheerio.load(data);
        $('.listing-portion-title', data).each(() => {
            const title = $(this).text();
            content.push(title);
        });
        console.log(`Debugging data : `, data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Successfull Scrape at ${Date.now().toLocaleString} - See content`,
                content: content
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Error returning scraped content: ${error}`
            })
        };
    }
};
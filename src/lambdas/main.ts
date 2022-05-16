import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as cheerio from 'cheerio';
import { puppetPdf } from '../services/puppetPdf';


export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    
    try {
        let pdf = await puppetPdf();
        console.log('pdf: ', pdf);
        const s3 = new AWS.S3();
    

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Check cloudwatch logs for buffer output'
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Error returning scraped content: ${error}`
            })
        };
    }
};
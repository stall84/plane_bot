import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { Context } from 'aws-sdk/clients/autoscaling';


export const handler = (event: APIGatewayProxyEvent, context: Context): APIGatewayProxyHandler => {

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Unknown Endpoint'
        })
    };
}
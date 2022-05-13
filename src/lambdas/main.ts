import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { Context } from 'aws-sdk/clients/autoscaling';
import { Event } from 'aws-sdk/clients/s3';


export const handler = async (event: Event, context: Context): Promise<any> => {

    console.log('Help, from inside this function !', context);
    return {
        statusCode: '201',
        body: JSON.stringify({
            message: 'TESTING'
        })
    };
}
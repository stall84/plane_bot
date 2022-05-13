import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';



export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    console.log('Help, from inside this function !', context);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'TESTING'
        })
    };
}
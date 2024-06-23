import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Runtime} from "aws-cdk-lib/aws-lambda";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BedrockTrainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda =  new NodejsFunction(this, 'BedrockTrainLambda', {
        entry: 'lambda/index.ts',
        handler: 'handler',
        runtime: Runtime.NODEJS_20_X
    })
  }
}

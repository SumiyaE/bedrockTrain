import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Architecture, Runtime} from "aws-cdk-lib/aws-lambda";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";

export class BedrockTrainStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const bedRockAccessPolicy = new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['bedrock:InvokeModel'],
            resources: ['*'],
        })

        const lambda = new NodejsFunction(this, 'BedrockTrainLambda', {
            entry: 'lambda/index.ts',
            handler: 'handler',
            runtime: Runtime.NODEJS_LATEST,
            architecture: Architecture.ARM_64,
            initialPolicy: [bedRockAccessPolicy],
            timeout: cdk.Duration.seconds(30),
        })
    }
}

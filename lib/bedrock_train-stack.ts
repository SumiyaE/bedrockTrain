import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Architecture, Runtime} from "aws-cdk-lib/aws-lambda";
import {Effect, PolicyStatement, Role} from "aws-cdk-lib/aws-iam";

export class BedrockTrainStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const lambda = new NodejsFunction(this, 'BedrockTrainLambda', {
            entry: 'lambda/index.ts',
            handler: 'handler',
            runtime: Runtime.NODEJS_LATEST,
            architecture: Architecture.ARM_64,
        })

        // 自前の IAM ポリシー作成
        const bedRockAccessPolicy = new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['bedrock-runtime:*'],
            resources: ['*'],
        })

        // IAM ロールにアタッチ
        const lambdaRole = lambda.role as Role;
        lambdaRole.addToPolicy(bedRockAccessPolicy);
    }
}

import {expect, test} from "vitest";
import * as cdk from "aws-cdk-lib";
import {Template} from "aws-cdk-lib/assertions";
import {ignoreAssetHashSerializer} from "../plugins/ignore-asset-hash";
import {BedrockTrainStack} from "../../lib/bedrock_train-stack";

test('snapshot test', () => {
  const app = new cdk.App();
  const stack = new BedrockTrainStack(app, 'BedrockTrainStackTest', {});
  const template = Template.fromStack(stack);

  // 次の行でプラグインをsnapshotSerializerに登録する
  expect.addSnapshotSerializer(ignoreAssetHashSerializer); // ★追加
  expect(template).toMatchSnapshot();
});

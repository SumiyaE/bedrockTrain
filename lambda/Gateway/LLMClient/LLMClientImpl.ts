import {LLMClient} from "./LLMClient";
import {BedrockRuntimeClient} from "@aws-sdk/client-bedrock-runtime";

export default class LLMClientImpl implements LLMClient {
  constructor(private readonly client: BedrockRuntimeClient) {
  }

  async send(): Promise<void> {
    // ここに実装を追加
    console.log('send')
  }
}
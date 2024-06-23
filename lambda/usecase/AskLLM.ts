import {LLMClient} from "../Gateway/LLMClient/LLMClient";

export default class AskLLM {

  constructor(
    private readonly client: LLMClient
  ) {
  }

  public async send() {
    await this.client.send();
  }
}
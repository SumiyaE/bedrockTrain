import {LLMClient} from "../../../lambda/Gateway/LLMClient/LLMClient";
import {vi} from "vitest";

export default class LLMClientMock implements LLMClient {
  send = vi.fn(
    async (): Promise<void> => {
      console.log('send')
    }
  );
}
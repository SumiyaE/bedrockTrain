import {describe, it} from "vitest";
import LLMClientMock from "./LLMClientMock";
import AskLLM from "../../../lambda/usecase/AskLLM";

describe("AskLLMのテストです", () => {
  it("クラスがnew できること", () => {
    const mockClient = new LLMClientMock();
    const askLLM = new AskLLM(mockClient);
  });
})
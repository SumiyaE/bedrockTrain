export interface LLMClient {
  send(): Promise<void>;
}
import {BedrockRuntimeClient, ConverseCommand, Message} from "@aws-sdk/client-bedrock-runtime";
import type {LambdaInterface} from '@aws-lambda-powertools/commons/types';
import {Tracer} from "@aws-lambda-powertools/tracer";

const tracer = new Tracer({serviceName: 'bedrock-train'});

class Lambda implements LambdaInterface {
  // Decorate your handler class method
  @tracer.captureLambdaHandler()
  public async handler(_event: unknown, _context: unknown): Promise<void> {
    const client = tracer.captureAWSv3Client(new BedrockRuntimeClient());
    const modelId = "anthropic.claude-v2:1";
    const userMessage = "please tell me how to use bedrock";

    const conversation: Message[] = [
      {
        role: "user",
        content: [{text: userMessage}],
      },
    ];
    const command: ConverseCommand = new ConverseCommand({
      modelId,
      messages: conversation,
      inferenceConfig: {maxTokens: 30, temperature: 0.5, topP: 0.9},
    });

    try {
      // Send the command to the model and wait for the response

      const response = await client.send(command);

      // Extract and print the streamed response text in real-time.
      const responseText = response.output?.message?.content?.[0].text ?? 'No response text available';
      console.log(`Response from model: ${responseText}`);
    } catch (err) {
      console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
    }
  }
}

const handlerClass = new Lambda();
export const handler = handlerClass.handler.bind(handlerClass);
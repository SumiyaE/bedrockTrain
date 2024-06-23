import { Handler } from 'aws-lambda';
import {BedrockRuntimeClient, ConverseCommand, Message} from "@aws-sdk/client-bedrock-runtime";

export const handler: Handler = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    console.log('hello this is lambda message')
    const client = new BedrockRuntimeClient();
    const modelId = "anthropic.claude-v2:1";
    const userMessage = "please tell me how to use bedrock";

    const conversation:Message[] = [
        {
            role: "user",
            content: [{ text: userMessage }],
        },
    ];
    const command : ConverseCommand = new ConverseCommand({
        modelId,
        messages: conversation,
        inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
    });

    try {
        // Send the command to the model and wait for the response
        const response = await client.send(command);

        // Extract and print the streamed response text in real-time.
        const responseText = response.output?.message?.content?.[0].text ?? 'No response text available';
    } catch (err) {
        console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
    }

};
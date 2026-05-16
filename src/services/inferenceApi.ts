export const createStreamingResponse = async (
  prompt: string
): Promise<Response> => {
  const encoder = new TextEncoder();

  const words = prompt.split(" ");

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        if (Math.random() < 0.05) {
          controller.error(new Error("Stream connection interrupted"));

          return;
        }

        const chunk = encoder.encode(word + " ");

        controller.enqueue(chunk);

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
import { useState } from "react";

import { createStreamingResponse } from "../services/inferenceApi";

const useStreaming = () => {
  const [output, setOutput] =
    useState("");

  const [tokenCount, setTokenCount] =
    useState(0);

  const [
    tokensPerSecond,
    setTokensPerSecond,
  ] = useState(0);

  const [error, setError] =
    useState("");

  const [isStreaming, setIsStreaming] =
    useState(false);

  const streamResponse = async (
    prompt: string
  ) => {
    try {
      setOutput("");

      setError("");

      setTokenCount(0);

      setTokensPerSecond(0);

      setIsStreaming(true);

      const startTime =
        performance.now();

      const response =
        await createStreamingResponse(
          prompt
        );

      const reader =
        response.body?.getReader();

      const decoder =
        new TextDecoder();

      if (!reader) {
        throw new Error(
          "No stream reader"
        );
      }

      let currentTokens = 0;

      while (true) {
        const { done, value } =
          await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value);

        currentTokens +=
          chunk
            .split(" ")
            .filter(Boolean).length;

        setOutput(
          (prev) => prev + chunk
        );

        setTokenCount(currentTokens);

        const seconds =
          (performance.now() -
            startTime) /
          1000;

        setTokensPerSecond(
          Number(
            (
              currentTokens / seconds
            ).toFixed(2)
          )
        );
      }
    } catch {
      setError("Streaming failed");
    } finally {
      setIsStreaming(false);
    }
  };

  const clearOutput = () => {
    setOutput("");

    setTokenCount(0);

    setTokensPerSecond(0);

    setError("");
  };

  return {
    output,
    tokenCount,
    tokensPerSecond,
    error,
    isStreaming,
    streamResponse,
    clearOutput,
  };
};

export default useStreaming;
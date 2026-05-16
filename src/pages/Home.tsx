import { useState } from "react";

import InputPanel from "../components/playground/InputPanel";

import MetricsPanel from "../components/playground/MetricsPanel";

import StreamingOutput from "../components/playground/StreamingOutput";

import ErrorBanner from "../components/playground/ErrorBanner";

import useStreaming from "../hooks/useStreaming";

const Home = () => {
  const [mode, setMode] = useState<
    "text" | "audio"
  >("text");

  const [prompt, setPrompt] =
    useState("");

  const [audioUrl, setAudioUrl] =
    useState("");

  const [transcript, setTranscript] =
    useState("");

  const {
    output,
    tokenCount,
    tokensPerSecond,
    error,
    isStreaming,
    streamResponse,
    clearOutput,
  } = useStreaming();

  const handleGenerate = async () => {
    if (mode === "text") {
      if (!prompt.trim()) return;

      await streamResponse(prompt);

      return;
    }

    if (mode === "audio") {
      if (!transcript.trim())
        return;

      await streamResponse(
        transcript
      );
    }
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <InputPanel
          mode={mode}
          setMode={setMode}
          prompt={prompt}
          setPrompt={setPrompt}
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
          transcript={transcript}
          setTranscript={
            setTranscript
          }
          handleGenerate={
            handleGenerate
          }
          isStreaming={
            isStreaming
          }
        />
      </div>

      <div className="right-panel">
        <StreamingOutput
          output={output}
          isStreaming={
            isStreaming
          }
          onClear={clearOutput}
        />

        <ErrorBanner error={error} />

        <MetricsPanel
          tokenCount={tokenCount}
          tokensPerSecond={
            tokensPerSecond
          }
        />
      </div>
    </div>
  );
};

export default Home;
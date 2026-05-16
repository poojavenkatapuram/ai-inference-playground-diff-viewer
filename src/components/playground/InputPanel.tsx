import AudioRecorder from "./AudioRecorder";

interface InputPanelProps {
  mode: "text" | "audio";
  setMode: React.Dispatch<React.SetStateAction<"text" | "audio">>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  audioUrl: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  handleGenerate: () => void;
  isStreaming: boolean;
}

const InputPanel = ({
  mode, setMode, prompt, setPrompt,
  audioUrl, setAudioUrl, transcript, setTranscript,
  handleGenerate, isStreaming,
}: InputPanelProps) => {
  return (
    <div>
      <h2>Input Section</h2>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <button
          onClick={() => setMode("text")}
          disabled={isStreaming}
          style={{ padding: "10px 16px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: mode === "text" ? "#2563eb" : "#475569", color: "white", opacity: isStreaming ? 0.7 : 1 }}
        >
          Text Mode
        </button>

        <button
          onClick={() => setMode("audio")}
          disabled={isStreaming}
          style={{ padding: "10px 16px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: mode === "audio" ? "#2563eb" : "#475569", color: "white", opacity: isStreaming ? 0.7 : 1 }}
        >
          Audio Mode
        </button>
      </div>

      {mode === "text" ? (
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          rows={10}
          disabled={isStreaming}
          style={{ width: "100%", marginTop: "16px", padding: "12px", borderRadius: "8px", border: "none", opacity: isStreaming ? 0.7 : 1 }}
        />
      ) : (
        <div style={{ marginTop: "16px" }}>
          <AudioRecorder
            audioUrl={audioUrl}
            setAudioUrl={setAudioUrl}
            transcript={transcript}
            setTranscript={setTranscript}
          />
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isStreaming}
        style={{ marginTop: "16px", padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: isStreaming ? "#475569" : "#2563eb", color: "white", opacity: isStreaming ? 0.7 : 1 }}
      >
        {isStreaming ? "Streaming..." : "Generate"}
      </button>
    </div>
  );
};

export default InputPanel;
interface StreamingOutputProps {
  output: string;

  isStreaming?: boolean;

  onClear?: () => void;
}

const StreamingOutput = ({
  output,
  isStreaming,
  onClear,
}: StreamingOutputProps) => {
  const handleCopy = async () => {
    if (!output.trim()) return;

    try {
      await navigator.clipboard.writeText(
        output
      );

      alert("Output copied");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h2>Model Output</h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={handleCopy}
            disabled={!output}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Copy
          </button>

          <button
            onClick={onClear}
            disabled={!output}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "16px",
          minHeight: "220px",
          backgroundColor: "#111827",
          borderRadius: "12px",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap",
        }}
      >
        {output}

        {isStreaming && (
          <span
            style={{
              animation:
                "blink 1s infinite",
              marginLeft: "2px",
            }}
          >
            |
          </span>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default StreamingOutput;
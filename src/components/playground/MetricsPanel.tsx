interface MetricsPanelProps {
  tokenCount: number;
  tokensPerSecond: number;
}

const MetricsPanel = ({
  tokenCount,
  tokensPerSecond,
}: MetricsPanelProps) => {
  return (
    <div
      style={{
        marginTop: "24px",
        padding: "16px",
        backgroundColor: "#1e293b",
        borderRadius: "8px",
      }}
    >
      <p>Tokens: {tokenCount}</p>
      <p>Tokens/sec: {tokensPerSecond}</p>
    </div>
  );
};

export default MetricsPanel;
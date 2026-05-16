export type DiffTokenType = {
  value: string;
  type: "same" | "added" | "removed";
};

interface DiffTokenProps {
  token: DiffTokenType;
}

const DiffTokenComponent = ({
  token,
}: DiffTokenProps) => {
  let backgroundColor = "transparent";
  let border = "1px solid transparent";

  if (token.type === "added") {
    backgroundColor = "#14532d";
    border = "1px solid #22c55e";
  }

  if (token.type === "removed") {
    backgroundColor = "#7f1d1d";
    border = "1px solid #ef4444";
  }

  return (
    <span
      title={token.type}
      style={{
        backgroundColor,
        border,
        padding: "6px 8px",
        borderRadius: "6px",
        marginRight: "6px",
        marginBottom: "6px",
        display: "inline-block",
        lineHeight: "1.8",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
    >
      {token.value}
    </span>
  );
};

export default DiffTokenComponent;
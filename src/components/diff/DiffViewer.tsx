import { useState } from "react";

import {
  generateTokenDiff,
} from "../../utils/diffUtils";

import DiffTokenComponent from "./DiffToken";

import {
  generateModelAResponse,
  generateModelBResponse,
} from "../../services/mockModels";

const DiffViewer = () => {
  const [prompt, setPrompt] =
    useState("");

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [leftText, setLeftText] =
    useState(
      "AI systems are powerful"
    );

  const [rightText, setRightText] =
    useState(
      "Modern AI systems are extremely powerful"
    );

  const { leftDiff, rightDiff } =
    generateTokenDiff(
      leftText,
      rightText
    );

  const addedCount =
    rightDiff.filter(
      (token) =>
        token.type === "added"
    ).length;

  const removedCount =
    leftDiff.filter(
      (token) =>
        token.type === "removed"
    ).length;

  const unchangedCount =
    leftDiff.filter(
      (token) =>
        token.type === "same"
    ).length;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    const modelA =
      await generateModelAResponse(
        prompt
      );

    const modelB =
      await generateModelBResponse(
        prompt
      );

    setLeftText(modelA);

    setRightText(modelB);

    setIsGenerating(false);
  };

  const handleSwap = () => {
    const temp = leftText;

    setLeftText(rightText);

    setRightText(temp);
  };

  const handleReset = () => {
    setLeftText(
      "AI systems are powerful"
    );

    setRightText(
      "Modern AI systems are extremely powerful"
    );

    setPrompt("");
  };

  return (
    <div
      style={{
        padding: "24px",
        color: "white",
        minHeight: "100vh",
        backgroundColor:
          "#0f172a",
      }}
    >
      <h1>
        AI Model Diff Viewer
      </h1>

      {isGenerating && (
        <div
          style={{
            marginTop: "12px",
            color: "#38bdf8",
            fontWeight: "bold",
          }}
        >
          Comparing AI model outputs...
        </div>
      )}

      <div
        style={{
          marginTop: "24px",
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          rows={4}
          placeholder="Enter prompt to compare AI model outputs..."
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            backgroundColor:
              "#1e293b",
            color: "white",
            resize: "vertical",
          }}
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{
            marginTop: "16px",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: isGenerating
              ? "not-allowed"
              : "pointer",
            backgroundColor:
              isGenerating
                ? "#475569"
                : "#2563eb",
            color: "white",
            opacity: isGenerating
              ? 0.7
              : 1,
            transition:
              "all 0.2s ease",
          }}
        >
          {isGenerating
            ? "Generating AI Responses..."
            : "Generate Model Comparison"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor:
              "#14532d",
            padding: "10px 16px",
            borderRadius: "8px",
          }}
        >
          Added: {addedCount}
        </div>

        <div
          style={{
            backgroundColor:
              "#7f1d1d",
            padding: "10px 16px",
            borderRadius: "8px",
          }}
        >
          Removed: {removedCount}
        </div>

        <div
          style={{
            backgroundColor:
              "#334155",
            padding: "10px 16px",
            borderRadius: "8px",
          }}
        >
          Unchanged:
          {" "}
          {unchangedCount}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleSwap}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor:
              "#2563eb",
            color: "white",
          }}
        >
          Swap Models
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor:
              "#475569",
            color: "white",
          }}
        >
          Reset Example
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        <textarea
          value={leftText}
          onChange={(e) =>
            setLeftText(
              e.target.value
            )
          }
          rows={6}
          placeholder="Model A Output"
          style={{
            flex: 1,
            minWidth: "320px",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            backgroundColor:
              "#1e293b",
            color: "white",
            resize: "vertical",
          }}
        />

        <textarea
          value={rightText}
          onChange={(e) =>
            setRightText(
              e.target.value
            )
          }
          rows={6}
          placeholder="Model B Output"
          style={{
            flex: 1,
            minWidth: "320px",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            backgroundColor:
              "#1e293b",
            color: "white",
            resize: "vertical",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "28px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            backgroundColor:
              "#111827",
            padding: "20px",
            borderRadius: "12px",
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          <h2>Model A</h2>

          <div
            style={{
              marginTop: "16px",
            }}
          >
            {leftDiff.map(
              (
                token,
                index
              ) => (
                <DiffTokenComponent
                  key={index}
                  token={token}
                />
              )
            )}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "320px",
            backgroundColor:
              "#111827",
            padding: "20px",
            borderRadius: "12px",
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          <h2>Model B</h2>

          <div
            style={{
              marginTop: "16px",
            }}
          >
            {rightDiff.map(
              (
                token,
                index
              ) => (
                <DiffTokenComponent
                  key={index}
                  token={token}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              backgroundColor:
                "#14532d",
              borderRadius: "4px",
            }}
          />

          <span>Added</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              backgroundColor:
                "#7f1d1d",
              borderRadius: "4px",
            }}
          />

          <span>Removed</span>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
import { useState } from "react";

import Home from "./pages/Home";

import DiffViewer from "./components/diff/DiffViewer";

function App() {
  const [activeTab, setActiveTab] =
    useState<
      "playground" | "diff"
    >("playground");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#020817",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px",
          borderBottom:
            "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          AI Inference Platform
        </h1>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <button
            onClick={() =>
              setActiveTab(
                "playground"
              )
            }
            style={{
              padding:
                "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              background:
                activeTab ===
                "playground"
                  ? "#2563eb"
                  : "#334155",
              color: "white",
            }}
          >
            AI Playground
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "diff"
              )
            }
            style={{
              padding:
                "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              background:
                activeTab ===
                "diff"
                  ? "#2563eb"
                  : "#334155",
              color: "white",
            }}
          >
            Model Diff Viewer
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab ===
        "playground" ? (
          <Home />
        ) : (
          <DiffViewer />
        )}
      </div>
    </div>
  );
}

export default App;

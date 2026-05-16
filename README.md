# AI Inference Playground + Model Diff Viewer

A modern AI tooling platform built with React and TypeScript that simulates real-time AI inference workflows and enables token-level comparison between AI model outputs using a dynamic programming based diff algorithm.

---

## Overview

This project combines two major AI tooling workflows into a single interactive platform.

### Part A — AI Inference Playground

Simulates real-time AI inference with:
- Text prompts
- Audio recording
- Live transcription
- Streaming token output
- Inference metrics

### Part B — AI Model Diff Viewer

Compares outputs from multiple AI models using:
- Token-level diffing
- Dynamic visualization
- Added/removed token highlighting
- Real-time comparison updates

---

## Features

### AI Inference Playground

- Real-time text prompt inference
- Audio recording using MediaRecorder API
- Live speech transcription using Web Speech API
- Streaming token-by-token rendering
- Token count and tokens-per-second metrics
- Error handling for interrupted streams
- Copy and clear generated output
- Professional responsive interface

### AI Model Diff Viewer

- Compare outputs from multiple AI models
- Prompt-based automatic response generation
- Token-level difference visualization
- Added and removed token highlighting
- Dynamic statistics tracking
- Real-time comparison updates
- Scrollable comparison panels
- Interactive comparison controls

---

## Tech Stack

- React
- TypeScript
- Vite
- Web Speech API
- MediaRecorder API
- Dynamic Programming (LCS Algorithm)

---

## System Architecture

```bash
src/
│
├── components/
│   ├── playground/
│   └── diff/
│
├── hooks/
├── services/
├── utils/
└── pages/
```

---

## Diff Algorithm

The AI Model Diff Viewer uses a dynamic programming based **Longest Common Subsequence (LCS)** algorithm to compute token-level differences between model outputs.

This enables:
- Accurate token comparison
- Identification of added tokens
- Identification of removed tokens
- Real-time diff visualization

---

## Example Workflow

### Inference Playground

1. Enter text prompt or record audio
2. Generate simulated streaming AI response
3. View live output rendering
4. Monitor inference metrics

### Model Diff Viewer

1. Enter prompt
2. Generate outputs from two AI models
3. Compare outputs side-by-side
4. Analyze token-level differences

---

## Screenshots

### AI Inference Playground

Real-time AI inference playground with text/audio input, live transcription, streaming output, and inference metrics.

![Inference Playground](https://github.com/poojavenkatapuram/ai-inference-playground-diff-viewer/blob/main/screenshots/playground.png?raw=true)

### Audio Transcription Workflow

Audio recording interface with live speech-to-text transcription using Web Speech API.

![Audio Workflow](https://github.com/poojavenkatapuram/ai-inference-playground-diff-viewer/blob/main/screenshots/audio.png?raw=true)

### AI Model Diff Viewer

Token-level AI model comparison interface using dynamic programming based diff visualization.

![Diff Viewer](https://github.com/poojavenkatapuram/ai-inference-playground-diff-viewer/blob/main/screenshots/diffviewer.png?raw=true)

---

## Setup Instructions

**Clone Repository**
```bash
git clone https://github.com/poojavenkatapuram/ai-inference-playground-diff-viewer.git
```

**Install Dependencies**
```bash
npm install
```

**Run Development Server**
```bash
npm run dev
```

---

## Future Improvements

- Real LLM API integration
- Streaming diff visualization
- Export comparison reports
- Multi-model comparison support
- Advanced inference analytics
- Persistent conversation history

---

## Author

Pooja Venkatapuram
# AI Inference Playground + Model Diff Viewer

A modern AI tooling platform built with React and TypeScript that simulates real-time AI inference workflows and enables token-level comparison between AI model outputs using a dynamic programming based diff algorithm.

---

# Overview

This project combines two major AI tooling workflows into a single interactive platform.

## Part A — AI Inference Playground

Simulates real-time AI inference with:
- text prompts,
- audio recording,
- live transcription,
- streaming token output,
- inference metrics.

## Part B — AI Model Diff Viewer

Compares outputs from multiple AI models using:
- token-level diffing,
- dynamic visualization,
- added/removed token highlighting,
- real-time comparison updates.

---

# Features

## AI Inference Playground

- Real-time text prompt inference
- Audio recording using MediaRecorder API
- Live speech transcription using Web Speech API
- Streaming token-by-token rendering
- Token count metrics
- Tokens-per-second metrics
- Error handling for interrupted streams
- Copy generated output
- Clear generated output
- Professional responsive interface

---

## AI Model Diff Viewer

- Compare outputs from multiple AI models
- Prompt-based automatic response generation
- Token-level difference visualization
- Added token highlighting
- Removed token highlighting
- Dynamic statistics tracking
- Real-time comparison updates
- Scrollable comparison panels
- Interactive comparison controls

---

# Tech Stack

- React
- TypeScript
- Vite
- Web Speech API
- MediaRecorder API
- Dynamic Programming (LCS Algorithm)

---

# System Architecture

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
Diff Algorithm
Longest Common Subsequence (LCS)

The AI Model Diff Viewer uses a dynamic programming based Longest Common Subsequence (LCS) algorithm to compute token-level differences between model outputs.

This enables:

accurate token comparison,
identification of added tokens,
identification of removed tokens,
real-time diff visualization.

The algorithm improves comparison quality significantly over naive positional comparison approaches.

## Example Workflow
Inference Playground
1.Enter text prompt or record audio
2.Generate simulated streaming AI response
3.View live output rendering
4.Monitor inference metrics

## Model Diff Viewer
1.Enter prompt
2.Generate outputs from two AI models
3.Compare outputs side-by-side
4.Analyze token-level differences

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

## Setup Instructions
Clone Repository

git clone https://github.com/poojavenkatapuram/ai-inference-playground-diff-viewer.git

## Install Dependencies
npm install

##Run Development Server
npm run dev


## Future Improvements
Real LLM API integration
Streaming diff visualization
Export comparison reports
Multi-model comparison support
Advanced inference analytics
Persistent conversation history


## Author

Pooja Venkatapuram
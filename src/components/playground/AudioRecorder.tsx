import { useRef, useState } from "react";

interface AudioRecorderProps {
  audioUrl: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

const AudioRecorder = ({ audioUrl, setAudioUrl, transcript, setTranscript }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef("");

  const setupRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscriptRef.current + interim);
    };

    recognition.onerror = (e: any) => {
      if (e.error !== "no-speech") setStatus("Mic error: " + e.error);
    };

    return recognition;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });

      finalTranscriptRef.current = "";
      setTranscript("");
      setAudioUrl("");

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start(200);

      const recognition = setupRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        recognition.start();
      }

      setIsRecording(true);
      setStatus("Recording…");
    } catch {
      setStatus("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setStatus("Done");
  };

  return (
    <div style={{ marginTop: "16px" }}>
      {isRecording && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "#ef4444", fontWeight: "bold" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444", animation: "pulse 1s infinite" }} />
          <span>Recording…</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          style={{ padding: "12px 20px", borderRadius: "8px", border: "none", cursor: "pointer", backgroundColor: isRecording ? "#ef4444" : "#3b82f6", color: "white", fontWeight: "600" }}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {status && <span style={{ fontSize: "13px", color: "#94a3b8" }}>{status}</span>}
      </div>

      {audioUrl && (
        <div style={{ marginTop: "16px" }}>
          <audio controls src={audioUrl} style={{ width: "100%" }} />
        </div>
      )}

      <div style={{ marginTop: "16px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Transcript</label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Transcript appears here as you speak. You can also type or edit…"
          rows={5}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#1e293b", color: "white", resize: "none" }}
        />
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </div>
  );
};

export default AudioRecorder;
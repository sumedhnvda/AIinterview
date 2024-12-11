"use client";

import { useEffect, useRef } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          maxWidth: "600px",
          border: "2px solid #333",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function Envelope() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const heartsRef = useRef([]);

  // Entrance animation
  useEffect(() => {
    animate(envelopeRef.current, {
      translateY: [-60, 0],
      opacity: [0, 1],
      duration: 900,
      easing: "cubicBezier(0.34, 1.56, 0.64, 1)",
    });
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // Flap buka
    animate(flapRef.current, {
      rotateX: [0, -180],
      duration: 600,
      easing: "easeInOutQuart",
    });

    // Surat keluar
    setTimeout(() => {
      setShowLetter(true);
      setTimeout(() => {
        animate(letterRef.current, {
          translateY: [40, -110],
          opacity: [0, 1],
          duration: 700,
          easing: "cubicBezier(0.34, 1.56, 0.64, 1)",
        });
      }, 50);

      // Hearts muncul
      setTimeout(() => {
        animate(".heart", {
          translateY: [0, -120],
          opacity: [1, 0],
          scale: [0.5, 1.2],
          delay: stagger(120),
          duration: 900,
          easing: "easeOutExpo",
        });
      }, 400);
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background dots */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? "8px" : "4px",
            height: i % 3 === 0 ? "8px" : "4px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
            top: `${10 + (i * 7.5)}%`,
            left: `${5 + (i * 8)}%`,
          }}
        />
      ))}

      <p style={{
        color: "#ad1457",
        fontSize: "14px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom: "32px",
        opacity: 0.7,
      }}>
        ada sesuatu untukmu ✨
      </p>

      {/* Envelope wrapper */}
      <div ref={envelopeRef} style={{ position: "relative", opacity: 0 }}>

        {/* Hearts */}
        <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "16px", zIndex: 10 }}>
          {["❤️", "🩷", "💕"].map((h, i) => (
            <span key={i} className="heart" style={{ fontSize: "22px", opacity: 0 }}>{h}</span>
          ))}
        </div>

        {/* Letter (behind envelope) */}
        {showLetter && (
          <div
            ref={letterRef}
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "220px",
              background: "#fff9f9",
              borderRadius: "8px",
              padding: "24px 20px",
              zIndex: 1,
              opacity: 0,
              boxShadow: "0 4px 20px rgba(173,20,87,0.1)",
              textAlign: "center",
              border: "1px solid #fce4ec",
            }}
          >
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎂</p>
            <p style={{ color: "#ad1457", fontWeight: "bold", fontSize: "15px", marginBottom: "8px" }}>
              Happy Birthday!
            </p>
            <p style={{ color: "#880e4f", fontSize: "13px", lineHeight: "1.6" }}>
              Semoga hari ini jadi hari yang paling indah buat kamu 🌸
            </p>
          </div>
        )}

        {/* Envelope body */}
        <div
          onClick={handleOpen}
          style={{
            position: "relative",
            zIndex: 5,
            cursor: opened ? "default" : "pointer",
            width: "280px",
          }}
        >
          {/* Envelope back */}
          <div style={{
            width: "280px",
            height: "180px",
            background: "linear-gradient(145deg, #f06292, #e91e8c)",
            borderRadius: "8px",
            position: "relative",
            boxShadow: "0 20px 60px rgba(173,20,87,0.35)",
            overflow: "hidden",
          }}>

            {/* Bottom triangle */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 0,
              height: 0,
              borderLeft: "140px solid transparent",
              borderRight: "140px solid transparent",
              borderBottom: "100px solid #e91e63",
            }} />

            {/* Left triangle */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              borderTop: "90px solid #ec407a",
              borderRight: "140px solid transparent",
            }} />

            {/* Right triangle */}
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderTop: "90px solid #ec407a",
              borderLeft: "140px solid transparent",
            }} />

            {/* Flap (top triangle) */}
            <div
              ref={flapRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transformOrigin: "top center",
                zIndex: 6,
              }}
            >
              <div style={{
                width: 0,
                height: 0,
                borderLeft: "140px solid transparent",
                borderRight: "140px solid transparent",
                borderTop: "100px solid #f48fb1",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
              }} />
            </div>

            {/* Seal */}
            {!opened && (
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                background: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                zIndex: 7,
              }}>
                💌
              </div>
            )}
          </div>
        </div>
      </div>

      {!opened && (
        <p style={{
          marginTop: "28px",
          color: "#ad1457",
          fontSize: "13px",
          letterSpacing: "1px",
          opacity: 0.6,
          animation: "pulse 2s infinite",
        }}>
          klik untuk membuka ↑
        </p>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
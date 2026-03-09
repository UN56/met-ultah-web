import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";

const CONFIG = {
  recipient: "Nama Dia",
  sender: "Nama Kamu",
  wishTitle: "my wish for you!",
  wishText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
};

export default function Envelope() {
  const [step, setStep] = useState(0); 
  const [showGallery, setShowGallery] = useState(false); 
  
  const wrapperRef = useRef(null);
  const layer1Ref = useRef(null); 
  const layer3Ref = useRef(null); 
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const hintRef = useRef(null);
  const galleryHintRef = useRef(null); // Ref baru khusus tulisan di kanan
  const frontTextRef = useRef(null);
  const sideTextRef = useRef(null);
  const overlayRef = useRef(null); 

  useEffect(() => {
    if (!wrapperRef.current || !hintRef.current) return;

    animate(wrapperRef.current, {
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 1200, 
      easing: "cubicBezier(0.34, 1.56, 0.64, 1)",
    });

    setTimeout(() => {
      if (hintRef.current) {
        animate(hintRef.current, {
          opacity: [0, 1],
          duration: 800,
          easing: "easeOutExpo",
        });
      }
    }, 1100);
  }, []);

  useEffect(() => {
    if (showGallery && overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 800,
        easing: "easeInOutQuad"
      });
    }
  }, [showGallery]);

  const handleClick = () => {
    if (step === 0) {
      setStep(1);
      
      // Ngilangin text "tap to open" pertama di bawah
      if (hintRef.current) {
        animate(hintRef.current, { opacity: [1, 0], duration: 300 });
      }

      // Amplopnya dinaikin dikit dari sebelumnya (180 -> 155)
      animate(wrapperRef.current, {
        translateY: [0, 155],
        duration: 1200,
        easing: "easeInOutQuart",
      });
      
      animate(flapRef.current, {
        rotateX: [0, -180], 
        duration: 1000,
        easing: "easeInOutQuart",
      });

      if (frontTextRef.current) {
        animate(frontTextRef.current, { opacity: [1, 0], duration: 500 });
      }

      setTimeout(() => {
        if (sideTextRef.current) {
          animate(sideTextRef.current, { 
            opacity: [0, 1], 
            translateX: [-30, 0],
            duration: 1200,
            easing: "easeOutQuart"
          });
        }
      }, 500);

      setTimeout(() => {
        if (letterRef.current) {
          animate(letterRef.current, {
            translateY: [0, -145], // Disesuaikan biar pas sama amplop
            opacity: [0, 1],
            duration: 1200, 
            easing: "cubicBezier(0.34, 1.56, 0.64, 1)",
          });
        }
        
        // Munculin text "tap to open gallery" di sebelah KANAN amplop
        setTimeout(() => {
          if (galleryHintRef.current) {
            animate(galleryHintRef.current, { 
              opacity: [0, 1], 
              translateX: [-10, 0], 
              duration: 600,
              easing: "easeOutQuad"
            });
          }
        }, 1200);
      }, 700); 
    } 
    else if (step === 1) {
      setShowGallery(true);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#c0392b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>

        <div 
          ref={wrapperRef} 
          style={{ 
            position: "relative", 
            width: "300px", 
            height: "200px",
            opacity: 0,
            transform: "scale(1.4)", 
            cursor: step === 0 ? "pointer" : step === 1 ? "pointer" : "default"
          }}
          onClick={handleClick}
        >

          {/* Teks Kanan Amplop (Tap to open gallery) */}
          <div ref={galleryHintRef} style={{ 
            position: "absolute", 
            right: "-95px", // Jarak ke kanan amplop
            top: "90px", 
            opacity: 0, 
            pointerEvents: "none",
            zIndex: 10
          }}>
            <p style={{ 
              fontFamily: "Georgia, serif", 
              fontSize: "10px", 
              color: "#ffffff", 
              letterSpacing: "1.5px", 
              textTransform: "uppercase", 
              textAlign: "left",
              lineHeight: "1.6",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)", // Kasih shadow biar makin jelas bacaannya
              animation: "blink 2s ease-in-out infinite" 
            }}>
              tap to<br/>open<br/>gallery ➔
            </p>
          </div>

          <div ref={sideTextRef} style={{ position: "absolute", left: "-160px", top: "50px", opacity: 0, textAlign: "right", pointerEvents: "none" }}>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "16px", color: "rgba(255,255,255,0.9)" }}>Happy Birthday</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "rgba(255,255,255,0.7)", letterSpacing: "1px", marginTop: "4px" }}>to {CONFIG.recipient}</p>
          </div>

          <div ref={layer1Ref} style={{ position: "absolute", zIndex: 1, width: "100%", height: "100%" }}>
            <svg width="300" height="200" viewBox="0 0 300 200" style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.3))", overflow: "visible" }}>
              <rect width="300" height="200" rx="3" fill="#dce8f0" />
              <g ref={flapRef} style={{ transformOrigin: "150px 0px", transformBox: "fill-box" }}>
                <polygon points="-1,0 301,0 150,110" fill="#e8f2f8" />
                <line x1="0" y1="0" x2="150" y2="110" stroke="#c8d9e8" strokeWidth="0.8" />
                <line x1="300" y1="0" x2="150" y2="110" stroke="#c8d9e8" strokeWidth="0.8" />
              </g>
            </svg>
          </div>

          <div style={{ position: "absolute", zIndex: 2, width: "100%", height: "100%", pointerEvents: "none" }}>
            <div ref={letterRef} style={{
              position: "absolute", bottom: "5px", left: "50%", marginLeft: "-110px",
              opacity: 0, background: "#f5f0ea", width: "220px", 
              padding: "25px 18px 45px", 
              boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            }}>
              <div style={{ textAlign: "center", fontSize: "16px", marginBottom: "10px", color: "#c0392b" }}>✦</div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "17px", color: "#1a1a1a", textAlign: "center", marginBottom: "10px" }}>{CONFIG.wishTitle}</p>
              <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "11px", color: "#333", lineHeight: "1.8", textAlign: "justify" }}>{CONFIG.wishText}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "13px", color: "#c0392b", marginTop: "12px", textAlign: "right" }}>Love, {CONFIG.sender} ♥</p>
            </div>
          </div>

          <div ref={layer3Ref} style={{ position: "absolute", zIndex: 3, width: "100%", height: "100%", pointerEvents: "none" }}>
            <svg width="300" height="200" viewBox="0 0 300 200" style={{ overflow: "visible" }}>
              <polygon points="-1,-1 -1,201 150,105" fill="#c8d9e8" /> 
              <polygon points="301,-1 301,201 150,105" fill="#c8d9e8" />
              <polygon points="-1,201 301,201 150,105" fill="#b8cfe0" />
              <g ref={frontTextRef}>
                <text x="150" y="125" textAnchor="middle" fill="#8aadcc" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Happy Birthday</text>
                <text x="150" y="140" textAnchor="middle" fill="#9fbdcf" fontSize="8" fontFamily="Georgia, serif" letterSpacing="1.5">to {CONFIG.recipient}</text>
              </g>
            </svg>
          </div>

        </div>

        {/* Text Hint Bawah (Awal) */}
        {!showGallery && (
          <p ref={hintRef} style={{
            opacity: 0,
            marginTop: "80px",
            color: "rgba(255,255,255,0.8)", 
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "Georgia, serif",
            animation: "floatUpDown 2s ease-in-out infinite", // Animasi naik turun dikit
          }}>
            tap to open
          </p>
        )}

      </div>

      {showGallery && (
        <div 
          ref={overlayRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)", 
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            cursor: "pointer"
          }}
          onClick={() => setShowGallery(false)} 
        >
          <div style={{ display: "flex", gap: "15px", marginBottom: "35px" }}>
            
            <div style={{
              background: "#fff", padding: "12px 12px 35px 12px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
              transform: "rotate(-4deg) translateY(10px)",
            }}>
              <div style={{ width: "130px", height: "150px", background: "#e0d8d0", display: "flex", alignItems: "center", justifyContent: "center", color: "#b0a898", fontSize: "11px", fontFamily: "Georgia, serif" }}>foto 1</div>
            </div>

            <div style={{
              background: "#fff", padding: "12px 12px 35px 12px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
              transform: "rotate(5deg) translateY(-10px)",
            }}>
              <div style={{ width: "130px", height: "150px", background: "#e0d8d0", display: "flex", alignItems: "center", justifyContent: "center", color: "#b0a898", fontSize: "11px", fontFamily: "Georgia, serif" }}>foto 2</div>
            </div>

          </div>

          <p style={{
            color: "#fff",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "22px",
            letterSpacing: "1px",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)"
          }}>
            "for more beautiful moments with you."
          </p>
        </div>
      )}
    </>
  );
}
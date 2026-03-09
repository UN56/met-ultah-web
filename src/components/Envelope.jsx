import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";

const CONFIG = {
  recipient: "Feya",
  sender: "Faya", 
  wishTitle: "my wish for you!",
  
  // NAMA FILE MP3 DAN FOTO KAMU
  audioSource: "/sorai.mp3", 
  foto1: "/foto1.jpeg", // Ubah sesuai nama file foto pertama lu
  foto2: "/foto2.jpeg", // Ubah sesuai nama file foto kedua lu
  
  page1: `Hari ini adalah hari yang spesial.
Hari ketika seseorang yang luar biasa hadir ke dunia.

Semoga setiap mimpi yang kamu simpan perlahan menemukan jalannya untuk menjadi nyata.
Semoga hidupmu selalu dipenuhi kebahagiaan dan hal-hal baik yang kamu pantas dapatkan.

Aku juga berharap kita masih punya banyak waktu untuk membuat kenangan bersama.
Mungkin berjalan di Kota Bandung saat senja,
sambil mendengarkan lagu dari One Direction
atau suara lembut Nadin Amizah yang menemani langkah kita.`,

  page2: `Di antara begitu banyak orang di dunia ini,
ada satu nama yang selalu terasa berbeda bagiku.
Rafeyfa Calla Asylacleosa Aisyhafiy.

Ada yang pernah berkata, mengapa senja selalu indah?
Kadang ia datang dengan langit yang gelap, kadang dengan warna merah yang merekah. Namun langit selalu menerimanya apa adanya.

Mungkin seperti itu juga perasaanku.
Bahkan jika aku harus terlahir seribu kali lagi, aku akan tetap memilih kamu.

Happy Birthday, Feya. ✨🎂`
};

export default function Envelope() {
  const [hasStarted, setHasStarted] = useState(false); 
  const [step, setStep] = useState(0); 
  const [showGallery, setShowGallery] = useState(false); 
  const [letterPage, setLetterPage] = useState(1);
  
  const audioRef = useRef(null);
  const wrapperRef = useRef(null);
  const layer1Ref = useRef(null); 
  const layer3Ref = useRef(null); 
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const hintRef = useRef(null);
  const galleryHintRef = useRef(null); 
  const frontTextRef = useRef(null);
  const sideTextRef = useRef(null);
  const overlayRef = useRef(null); 

  useEffect(() => {
    if (!hasStarted || !wrapperRef.current || !hintRef.current) return;

    animate(wrapperRef.current, {
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 1200, 
      easing: "cubicBezier(0.34, 1.56, 0.64, 1)",
    });

    setTimeout(() => {
      if (hintRef.current) {
        animate(hintRef.current, { opacity: [0, 1], duration: 800, easing: "easeOutExpo" });
      }
    }, 1100);
  }, [hasStarted]);

  useEffect(() => {
    if (showGallery && overlayRef.current) {
      animate(overlayRef.current, { opacity: [0, 1], duration: 800, easing: "easeInOutQuad" });
    }
  }, [showGallery]);

  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play(); 
    }
  };

  const handleClick = () => {
    if (step === 0) {
      setStep(1);
      
      if (hintRef.current) animate(hintRef.current, { opacity: [1, 0], duration: 300 });

      animate(wrapperRef.current, { translateY: [0, 160], duration: 1200, easing: "easeInOutQuart" });
      animate(flapRef.current, { rotateX: [0, -180], duration: 1000, easing: "easeInOutQuart" });

      if (frontTextRef.current) animate(frontTextRef.current, { opacity: [1, 0], duration: 500 });

      setTimeout(() => {
        if (sideTextRef.current) {
          animate(sideTextRef.current, { opacity: [0, 1], translateX: [-30, 0], duration: 1200, easing: "easeOutQuart" });
        }
      }, 500);

      setTimeout(() => {
        if (letterRef.current) {
          // TARIKAN SURAT UDAH DITURUNIN BIAR TETEP MASUK AMPLOP (-160)
          animate(letterRef.current, {
            translateY: [0, -160], 
            opacity: [0, 1],
            duration: 1200, 
            easing: "cubicBezier(0.34, 1.56, 0.64, 1)",
          });
        }
        
        setTimeout(() => {
          if (galleryHintRef.current) {
            animate(galleryHintRef.current, { opacity: [0, 1], translateX: [-10, 0], duration: 600, easing: "easeOutQuad" });
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
      <audio ref={audioRef} src={CONFIG.audioSource} loop />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes floatUpDown { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
        .letter-scroll::-webkit-scrollbar { width: 3px; }
        .letter-scroll::-webkit-scrollbar-track { background: transparent; }
        .letter-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>

      {/* WELCOME SCREEN */}
      {!hasStarted && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "#111", zIndex: 100, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center"
        }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#fff", fontSize: "28px", letterSpacing: "2px", marginBottom: "30px", fontWeight: "300" }}>
            Welcome, <b>Rafeyfa Calla Asylacleosa Aisyhafiy</b>.
          </h1>
          <p onClick={handleStart} style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", cursor: "pointer", animation: "blink 2s ease-in-out infinite", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 20px", borderRadius: "30px" }}>
            Tap to start
          </p>
        </div>
      )}

      {/* MAIN ENVELOPE */}
      <div style={{ minHeight: "100vh", background: "#c0392b", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div ref={wrapperRef} style={{ position: "relative", width: "300px", height: "200px", opacity: 0, transform: "scale(1.4)", cursor: step === 0 ? "pointer" : step === 1 ? "pointer" : "default" }} onClick={handleClick}>
          
          <div ref={galleryHintRef} style={{ position: "absolute", right: "-100px", top: "90px", opacity: 0, pointerEvents: "none", zIndex: 10 }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", color: "#ffffff", letterSpacing: "1.5px", textTransform: "uppercase", textAlign: "left", lineHeight: "1.6", textShadow: "0 2px 4px rgba(0,0,0,0.3)", animation: "blink 2s ease-in-out infinite" }}>tap to<br/>open<br/>gallery ➔</p>
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

          <div style={{ position: "absolute", zIndex: 2, width: "100%", height: "100%", pointerEvents: step === 0 ? "none" : "auto" }}>
            <div ref={letterRef} style={{
              position: "absolute", bottom: "5px", left: "50%", marginLeft: "-115px", opacity: 0, background: "#f5f0ea", width: "230px", height: "290px", padding: "20px 18px 15px", boxShadow: "0 10px 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", cursor: "default"
            }}>
              <div style={{ textAlign: "center", fontSize: "16px", marginBottom: "5px", color: "#c0392b" }}>✦</div>
              <div className="letter-scroll" style={{ flex: 1, overflowY: "auto", paddingRight: "5px" }}>
                <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "11px", color: "#333", lineHeight: "1.6", textAlign: "justify", whiteSpace: "pre-line" }}>
                  {letterPage === 1 ? CONFIG.page1 : CONFIG.page2}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: letterPage === 1 ? "flex-end" : "space-between", alignItems: "center", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #e0d8d0" }}>
                {letterPage === 2 && <span onClick={(e) => { e.stopPropagation(); setLetterPage(1); }} style={{ fontSize: "12px", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#c0392b", cursor: "pointer", fontWeight: "bold" }}>« prev</span>}
                {letterPage === 1 ? <span onClick={(e) => { e.stopPropagation(); setLetterPage(2); }} style={{ fontSize: "12px", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#c0392b", cursor: "pointer", fontWeight: "bold" }}>next »</span> : <span style={{ fontSize: "11px", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#c0392b" }}>Love, {CONFIG.sender} ♥</span>}
              </div>
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

        {hasStarted && !showGallery && (
          <p ref={hintRef} style={{ opacity: 0, marginTop: "80px", color: "rgba(255,255,255,0.8)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "Georgia, serif", animation: "floatUpDown 2s ease-in-out infinite" }}>
            tap to open
          </p>
        )}
      </div>

      {/* GALLERY */}
      {showGallery && (
        <div ref={overlayRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0, cursor: "pointer" }} onClick={() => setShowGallery(false)}>
          <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
            
            {/* FOTO 1 */}
            <div style={{ background: "#fff", padding: "10px 10px 30px 10px", boxShadow: "0 15px 40px rgba(0,0,0,0.5)", transform: "rotate(-4deg) translateY(10px)" }}>
              <img src={CONFIG.foto1} alt="Foto 1" style={{ width: "140px", height: "160px", objectFit: "cover", background: "#e0d8d0" }} />
            </div>

            {/* FOTO 2 */}
            <div style={{ background: "#fff", padding: "10px 10px 30px 10px", boxShadow: "0 15px 40px rgba(0,0,0,0.5)", transform: "rotate(5deg) translateY(-10px)" }}>
              <img src={CONFIG.foto2} alt="Foto 2" style={{ width: "140px", height: "160px", objectFit: "cover", background: "#e0d8d0" }} />
            </div>

          </div>
          <p style={{ color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "22px", letterSpacing: "1px", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
            "for more beautiful moments with you."
          </p>
        </div>
      )}
    </>
  );
}
import { useEffect } from "react"
import { animate, cubicBezier } from 'animejs';

function App() {
  useEffect(() => {
    animate(".box", {
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo"
    })
  }, [])

  const handleHover = () => {
    animate(".box", {
      scale: 3,
  duration: 1000,
  ease: cubicBezier(0.592,-1,0,1.628)
    })
  }

  const handleLeave = () => {
    animate(".box", {
      scale: [1.1, 1],
      duration: 300,
      easing: "easeOutBack"
    })
  }

  return (
    <div className="bg-red-400 min-h-screen flex items-center justify-center">
      <div
        className="box bg-white rounded-2xl p-10 text-4xl font-bold shadow-xl cursor-pointer"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        Hello, Apaya!
      </div>
    </div>
  )
}

export default App
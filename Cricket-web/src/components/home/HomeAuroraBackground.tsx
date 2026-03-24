
export default function HomeAuroraBackground() {
  const lanes = [
    { color: 'rgba(37, 99, 235, 0.6)', left: '5%', duration: 15, width: '35vw' },
    { color: 'rgba(245, 158, 11, 0.5)', left: '25%', duration: 18, width: '40vw' },
    { color: 'rgba(139, 92, 246, 0.6)', left: '55%', duration: 16, width: '35vw' },
    { color: 'rgba(14, 165, 233, 0.5)', left: '75%', duration: 14, width: '30vw' },
  ];

  return (
    <>
      <style>
        {`
          /* Cloud Bullet Stream */
          @keyframes stream-rise {
            0% { transform: translateY(120vh) scaleY(1); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-150vh) scaleY(1.2); opacity: 0; }
          }
          
          /* Straight Spark Animation (Restored) */
          @keyframes spark-rise-fast {
            0% { transform: translateY(110vh) scaleY(1); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-110vh) scaleY(5); opacity: 0; }
          }

          .background-container {
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             overflow: hidden;
             pointer-events: none;
             z-index: 0;
          }

          .cloud-bullet {
            position: absolute;
            bottom: -150%; 
            height: 150vh;
            border-radius: 9999px; /* Max border radius for smoother edges */
            filter: blur(80px); /* Increased blur to hide hard edges */
            will-change: transform, opacity;
            opacity: 0;
            mix-blend-mode: multiply; /* Better blending */
          }
          
          .spark {
            position: absolute;
            width: 2px;
            height: 80px;
            background: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            will-change: transform;
            opacity: 0;
          }
        `}
      </style>
      <div className="fixed inset-0 z-0 bg-slate-50 pointer-events-none transform-gpu overflow-hidden">
         <div className="background-container">
            
            {lanes.map((lane, i) => (
              <div key={i}>
                <div 
                  className="cloud-bullet"
                  style={{
                    left: lane.left,
                    width: lane.width,
                    background: `linear-gradient(to top, transparent, ${lane.color}, transparent)`,
                    animation: `stream-rise ${lane.duration}s infinite linear`,
                  }}
                />
                <div 
                  className="cloud-bullet"
                  style={{
                    left: lane.left,
                    width: lane.width,
                    background: `linear-gradient(to top, transparent, ${lane.color}, transparent)`,
                    animation: `stream-rise ${lane.duration}s infinite linear`,
                    animationDelay: `-${lane.duration / 2}s`
                  }}
                />
              </div>
            ))}

            {/* Straight Sparks */}
            {[...Array(6)].map((_, i) => (
               <div 
                 key={`spark-${i}`}
                 className="spark" 
                 style={{ 
                   left: `${10 + i * 18}%`, 
                   animation: `spark-rise-fast ${5 + (i % 4)}s infinite linear -${i * 2}s` 
                 }} 
               />
            ))}

         </div>
      </div>
    </>
  );
}

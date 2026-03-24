
export const PremiumBackground = () => {
  return (
    <>
      <style>
        {`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-shift {
            background-size: 300% 300%;
            animation: gradient-shift 20s ease infinite;
          }
        `}
      </style>
      <div 
        className="fixed inset-0 z-[-1] animate-gradient-shift opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(-45deg, #f1f5f9, #dbeafe, #eff6ff, #f8fafc)"
        }}
      />
    </>
  );
};

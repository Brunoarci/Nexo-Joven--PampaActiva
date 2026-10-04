import React from 'react';

interface NexoLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const NexoLogo: React.FC<NexoLogoProps> = ({
  className = '',
  size = 36,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="nexoVioletGrad" x1="6" y1="6" x2="38" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="nexoTealGrad" x1="26" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="nexoHighFiveGlow" x1="28" y1="12" x2="36" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Left Stylized Figure (Forming the stem & arch of the 'N') */}
        {/* Head of Figure 1 */}
        <circle cx="17" cy="14" r="5.5" fill="url(#nexoVioletGrad)" />
        
        {/* Body and connecting dynamic arm of Figure 1 */}
        <path
          d="M 12 54 L 12 28 C 12 22 17 19 23 23 L 33 31 C 36 33.5 36 37 36 41 L 36 54"
          stroke="url(#nexoVioletGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Stylized Figure (Forming the loop & hook of the 'J', connecting arm with Figure 1) */}
        {/* Head of Figure 2 */}
        <circle cx="47" cy="14" r="5.5" fill="url(#nexoTealGrad)" />

        {/* Body and hook of Figure 2 */}
        <path
          d="M 32 23 C 37 19 44 21 46 27 L 46 44 C 46 51 40 55 33 55 C 27 55 24 51 25 46"
          stroke="url(#nexoTealGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* High-five spark / Connection point between the two arms */}
        <circle cx="32" cy="20" r="3.2" fill="url(#nexoHighFiveGlow)" />
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-xl font-black tracking-tight text-slate-900 leading-tight">
            Nexo<span className="text-violet-600">Joven</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            General Pico
          </span>
        </div>
      )}
    </div>
  );
};

import React from 'react';

export const IstiqlolLogo = ({ className = "w-11 h-11", showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${showText ? '' : ''}`}>
      <svg
        viewBox="0 0 500 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          {/* Intense Neon Green Glow */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Deep Drop Shadow */}
          <filter id="shieldShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00FF66" floodOpacity="0.45" />
          </filter>

          {/* Silver Chrome Gradient (Light) */}
          <linearGradient id="silverChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#DDE3EA" />
            <stop offset="50%" stopColor="#9AA4AF" />
            <stop offset="75%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Silver Bevel Vertical */}
          <linearGradient id="silverBevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#CBD5E1" />
            <stop offset="65%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Glowing Green Shield Background */}
          <radialGradient id="greenCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E65B" />
            <stop offset="45%" stopColor="#007A33" />
            <stop offset="85%" stopColor="#023616" />
            <stop offset="100%" stopColor="#011A0A" />
          </radialGradient>

          {/* Green Flame Ambient */}
          <linearGradient id="greenFlame" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FF66" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#009933" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
          </linearGradient>

          {/* Star Chrome Facet Gradients */}
          <linearGradient id="starLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="starDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Ambient Neon Flare Behind Shield */}
        <path
          d="M 60 120 L 440 120 L 420 350 L 250 515 L 80 350 Z"
          fill="url(#greenFlame)"
          filter="url(#neonGlow)"
          opacity="0.8"
        />

        {/* =================================================== */}
        {/* 1. ROYAL CROWN (TOP)                               */}
        {/* =================================================== */}
        <g id="crown" filter="url(#shieldShadow)">
          {/* Crown Base Band */}
          <path
            d="M 140 105 C 200 115 300 115 360 105 L 370 122 C 300 132 200 132 130 122 Z"
            fill="url(#silverBevel)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Crown Jewels on Base Band */}
          <circle cx="170" cy="115" r="4" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="210" cy="118" r="4.5" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="250" cy="119" r="5.5" fill="#FFFFFF" stroke="#00FF66" strokeWidth="2" />
          <circle cx="290" cy="118" r="4.5" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="330" cy="115" r="4" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Crown Spikes Body */}
          <path
            d="M 140 105 
               L 115 45 
               L 180 75 
               L 250 15 
               L 320 75 
               L 385 45 
               L 360 105 
               C 300 115 200 115 140 105 Z"
            fill="url(#silverChrome)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Crown Facet Highlights */}
          <path d="M 250 15 L 250 119 L 210 70 Z" fill="#FFFFFF" opacity="0.4" />
          <path d="M 250 15 L 250 119 L 290 70 Z" fill="#475569" opacity="0.3" />
          <path d="M 115 45 L 140 105 L 155 70 Z" fill="#FFFFFF" opacity="0.3" />
          <path d="M 385 45 L 360 105 L 345 70 Z" fill="#475569" opacity="0.3" />

          {/* Diamonds on Crown Peaks */}
          <polygon points="250,5 258,15 250,25 242,15" fill="#00FF66" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="115,35 122,43 115,51 108,43" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="385,35 392,43 385,51 378,43" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="180" cy="73" r="5" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="320" cy="73" r="5" fill="#00FF66" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* =================================================== */}
        {/* 2. OUTER SHIELD FRAME                               */}
        {/* =================================================== */}
        <g id="shield">
          {/* Outer Chrome Bevel Border */}
          <path
            d="M 70 120 L 430 120 L 412 345 L 250 515 L 88 345 Z"
            fill="url(#silverBevel)"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinejoin="round"
            filter="url(#shieldShadow)"
          />

          {/* Inner Glowing Green Neon Trench */}
          <path
            d="M 85 133 L 415 133 L 398 338 L 250 493 L 102 338 Z"
            fill="#011A0A"
            stroke="#00FF66"
            strokeWidth="6"
            filter="url(#neonGlow)"
          />

          {/* Inner Shield Silver Bevel Rim */}
          <path
            d="M 96 142 L 404 142 L 388 332 L 250 478 L 112 332 Z"
            fill="url(#silverChrome)"
          />

          {/* Shield Core Body (Emerald Sunburst Gradient) */}
          <path
            d="M 104 150 L 396 150 L 381 326 L 250 466 L 119 326 Z"
            fill="url(#greenCore)"
          />

          {/* Shield Texture / Carbon Fiber Grid overlay */}
          <path
            d="M 104 150 L 396 150 L 381 326 L 250 466 L 119 326 Z"
            fill="none"
            stroke="#00FF66"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.25"
          />
        </g>

        {/* =================================================== */}
        {/* 3. "ISTIQLOL" 3D EMBOSSED SILVER HEADER BANNER      */}
        {/* =================================================== */}
        <g id="headerBanner">
          {/* Header Banner Arc Background */}
          <path
            d="M 112 158 L 388 158 L 380 230 C 300 242 200 242 120 230 Z"
            fill="#032511"
            stroke="#00FF66"
            strokeWidth="2"
          />

          {/* 3D Deep Shadow Text for ISTIQLOL */}
          <text
            x="250"
            y="218"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="54"
            fontWeight="900"
            letterSpacing="5"
            fill="#011608"
          >
            ISTIQLOL
          </text>
          <text
            x="250"
            y="216"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="54"
            fontWeight="900"
            letterSpacing="5"
            fill="#1E293B"
          >
            ISTIQLOL
          </text>

          {/* 3D Main Chrome Text for ISTIQLOL */}
          <text
            x="250"
            y="213"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="54"
            fontWeight="900"
            letterSpacing="5"
            fill="url(#silverChrome)"
            stroke="#FFFFFF"
            strokeWidth="2"
          >
            ISTIQLOL
          </text>

          {/* Specular Edge Highlight */}
          <text
            x="250"
            y="211"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="54"
            fontWeight="900"
            letterSpacing="5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.8"
          >
            ISTIQLOL
          </text>

          {/* Thin Separator Arch */}
          <path
            d="M 125 236 C 205 248 295 248 375 236"
            stroke="url(#silverChrome)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* =================================================== */}
        {/* 4. CENTRAL COMPASS STAR & MEDALLION                 */}
        {/* =================================================== */}
        <g id="centralMedallion" filter="url(#shieldShadow)">
          {/* Outer Chrome Ring */}
          <circle
            cx="250"
            cy="345"
            r="64"
            fill="#011F0D"
            stroke="url(#silverBevel)"
            strokeWidth="9"
          />
          {/* Inner Neon Ring */}
          <circle
            cx="250"
            cy="345"
            r="56"
            fill="none"
            stroke="#00FF66"
            strokeWidth="2.5"
            opacity="0.9"
          />

          {/* Compass Pointer Points (Top, Bottom, Left, Right) */}
          <polygon points="250,268 256,282 244,282" fill="url(#silverChrome)" stroke="#FFFFFF" strokeWidth="1" />
          <polygon points="250,422 256,408 244,408" fill="url(#silverChrome)" stroke="#FFFFFF" strokeWidth="1" />
          <polygon points="173,345 187,339 187,351" fill="url(#silverChrome)" stroke="#FFFFFF" strokeWidth="1" />
          <polygon points="327,345 313,339 313,351" fill="url(#silverChrome)" stroke="#FFFFFF" strokeWidth="1" />

          {/* Center 5-Pointed 3D Faceted Star */}
          {/* Top Point */}
          <polygon points="250,290 250,345 235,328" fill="url(#starLight)" />
          <polygon points="250,290 250,345 265,328" fill="url(#starDark)" />
          {/* Top-Right Point */}
          <polygon points="302,328 250,345 265,328" fill="url(#starLight)" />
          <polygon points="302,328 250,345 272,356" fill="url(#starDark)" />
          {/* Bottom-Right Point */}
          <polygon points="282,388 250,345 272,356" fill="url(#starLight)" />
          <polygon points="282,388 250,345 250,362" fill="url(#starDark)" />
          {/* Bottom-Left Point */}
          <polygon points="218,388 250,345 250,362" fill="url(#starLight)" />
          <polygon points="218,388 250,345 228,356" fill="url(#starDark)" />
          {/* Top-Left Point */}
          <polygon points="198,328 250,345 228,356" fill="url(#starLight)" />
          <polygon points="198,328 250,345 235,328" fill="url(#starDark)" />

          {/* Outer Star Crisp White Outline */}
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        {/* =================================================== */}
        {/* 5. SURROUNDING STARS (5 STARS)                      */}
        {/* =================================================== */}
        {/* Top-Center Star (above medallion) */}
        <g transform="translate(250, 268) scale(0.68) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="url(#silverChrome)"
            stroke="#00FF66"
            strokeWidth="3"
            filter="url(#neonGlow)"
          />
        </g>

        {/* Top-Left Star */}
        <g transform="translate(162, 298) scale(0.55) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="url(#silverChrome)"
            stroke="#00FF66"
            strokeWidth="3"
          />
        </g>

        {/* Top-Right Star */}
        <g transform="translate(338, 298) scale(0.55) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="url(#silverChrome)"
            stroke="#00FF66"
            strokeWidth="3"
          />
        </g>

        {/* Mid-Left Star */}
        <g transform="translate(150, 368) scale(0.42) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="#00FF66"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        {/* Mid-Right Star */}
        <g transform="translate(350, 368) scale(0.42) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="#00FF66"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        {/* Bottom-Left Star */}
        <g transform="translate(168, 430) scale(0.48) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="#00FF66"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        {/* Bottom-Right Star */}
        <g transform="translate(332, 430) scale(0.48) translate(-250, -345)">
          <polygon
            points="250,288 266,328 304,328 273,356 284,390 250,363 216,390 227,356 196,328 234,328"
            fill="#00FF66"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        {/* =================================================== */}
        {/* 6. "2012" 3D SILVER BLOCK NUMBERS (BOTTOM)         */}
        {/* =================================================== */}
        <g id="year2012">
          {/* Shadow 2012 */}
          <text
            x="250"
            y="464"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="46"
            fontWeight="900"
            letterSpacing="3"
            fill="#011608"
          >
            2012
          </text>
          <text
            x="250"
            y="462"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="46"
            fontWeight="900"
            letterSpacing="3"
            fill="#1E293B"
          >
            2012
          </text>
          {/* Main Chrome 2012 */}
          <text
            x="250"
            y="459"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="46"
            fontWeight="900"
            letterSpacing="3"
            fill="url(#silverChrome)"
            stroke="#FFFFFF"
            strokeWidth="2"
          >
            2012
          </text>
          {/* Specular Highlight */}
          <text
            x="250"
            y="457"
            textAnchor="middle"
            fontFamily="'Impact', 'Arial Black', sans-serif"
            fontSize="46"
            fontWeight="900"
            letterSpacing="3"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.8"
          >
            2012
          </text>
        </g>
      </svg>

      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#F3BE53] transition-colors">
              ISTIQLOL
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F3BE53] animate-pulse"></span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase -mt-1 hidden sm:block">
            Mazzali va tezkor!
          </p>
        </div>
      )}
    </div>
  );
};

export default IstiqlolLogo;


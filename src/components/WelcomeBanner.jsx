import React from 'react';

function WelcomeBanner() {
  return (
    <div className="el-welcome-banner">
      {/* Banner Text Content */}
      <div className="el-banner-text">
        <h1 className="el-banner-title">
          Welcome Admin! <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p className="el-banner-subtitle">
          Manage your CRM system efficiently.
        </p>
      </div>

      {/* Right side Education Themed Illustration (Laptop, Graduation Cap, Books, Plants) */}
      <div className="el-banner-illustration" aria-hidden="true">
        <svg
          viewBox="0 0 340 140"
          width="320"
          height="130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Shadow Filter */}
            <filter id="bannerShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1e0a4f" floodOpacity="0.35" />
            </filter>

            {/* Laptop Screen Gradient */}
            <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            {/* Laptop Base Gradient */}
            <linearGradient id="laptopBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            {/* Foliage Gradients */}
            <linearGradient id="leafGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6326d7" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <linearGradient id="leafGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            {/* Books Gradients */}
            <linearGradient id="bookBrownGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c28e5c" />
              <stop offset="100%" stopColor="#d9a779" />
            </linearGradient>

            <linearGradient id="bookBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Background Decorative Purple Leaves (Left & Behind) */}
          <g opacity="0.85">
            {/* Left plant stem */}
            <path
              d="M45 125 C40 85, 30 55, 15 35"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left plant leaves */}
            <path d="M15 35 C10 20, 26 20, 24 38 C22 46, 17 40, 15 35 Z" fill="url(#leafGrad2)" />
            <path d="M28 55 C20 45, 38 42, 36 60 C34 68, 30 60, 28 55 Z" fill="url(#leafGrad1)" />
            <path d="M38 78 C32 68, 52 68, 48 85 C44 92, 40 84, 38 78 Z" fill="url(#leafGrad2)" />

            {/* Right foliage / plants behind books */}
            <path
              d="M295 125 C305 90, 318 60, 330 30"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M330 30 C340 18, 320 18, 322 36 C324 44, 328 38, 330 30 Z" fill="url(#leafGrad1)" />
            <path d="M316 55 C328 42, 308 42, 310 60 C312 68, 314 60, 316 55 Z" fill="url(#leafGrad2)" />
            <path d="M305 82 C320 70, 298 68, 300 88 C302 95, 304 88, 305 82 Z" fill="url(#leafGrad1)" />
          </g>

          {/* Stack of Books on Right */}
          <g filter="url(#bannerShadow)">
            {/* Bottom Book (Blue) */}
            <rect x="230" y="102" width="85" height="15" rx="3" fill="url(#bookBlueGrad)" />
            <rect x="233" y="104" width="79" height="11" rx="2" fill="#ffffff" />
            <rect x="230" y="102" width="9" height="15" rx="2" fill="#1d4ed8" />

            {/* Top Book (Tan/Brown) */}
            <rect x="234" y="86" width="78" height="14" rx="3" fill="url(#bookBrownGrad)" />
            <rect x="237" y="88" width="72" height="10" rx="2" fill="#fef3c7" />
            <rect x="234" y="86" width="8" height="14" rx="2" fill="#9a6b3e" />
            {/* Book Bookmark ribbon */}
            <path d="M285 86 L285 102 L290 98 L295 102 L295 86 Z" fill="#ef4444" />
          </g>

          {/* Laptop (Perspective/Isometric view matching screenshot) */}
          <g filter="url(#bannerShadow)">
            {/* Laptop Base */}
            <path
              d="M60 120 L195 120 L215 130 L40 130 Z"
              fill="url(#laptopBaseGrad)"
            />
            {/* Laptop Trackpad */}
            <rect x="115" y="123" width="28" height="5" rx="1.5" fill="#94a3b8" />

            {/* Laptop Screen Bezel */}
            <path
              d="M72 45 L182 45 L192 120 L62 120 Z"
              fill="#1e1e2d"
            />
            {/* Inner Glowing Screen */}
            <path
              d="M76 49 L178 49 L188 116 L66 116 Z"
              fill="url(#laptopScreenGrad)"
            />

            {/* Screen Content Graphic (Mini Education Graphics / Waves) */}
            <path
              d="M76 95 Q110 80, 140 100 T188 90 L188 116 L66 116 Z"
              fill="#ffffff"
              fillOpacity="0.2"
            />
            {/* White graduation cap silhouette inside screen */}
            <g transform="translate(118, 68) scale(0.65)" opacity="0.9">
              <polygon points="20,5 38,13 20,21 2,13" fill="#ffffff" />
              <path d="M9 17 L9 26 C9 31 31 31 31 26 L31 17" fill="#ffffff" />
              <path d="M34 14 L34 27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* 3D Black Graduation Mortarboard Cap (Hovering / tilted on laptop) */}
          <g filter="url(#bannerShadow)" transform="translate(95, 20) rotate(-6)">
            {/* Cap Base / Skull cap under the board */}
            <path
              d="M32 30 C32 40, 68 40, 68 30 C68 25, 32 25, 32 30 Z"
              fill="#0f172a"
            />
            <path
              d="M34 32 C34 43, 66 43, 66 32"
              fill="#1e293b"
            />

            {/* Diamond Top Board */}
            <polygon
              points="50,6 88,22 50,38 12,22"
              fill="#1e1b4b"
            />
            {/* Top Board Highlight Edge */}
            <polygon
              points="50,6 88,22 50,38 12,22"
              fill="none"
              stroke="#312e81"
              strokeWidth="1.5"
            />

            {/* Button on top */}
            <circle cx="50" cy="22" r="3" fill="#fbbf24" />

            {/* Gold Tassel dangling gracefully */}
            <path
              d="M50 22 C65 24, 76 35, 78 48"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Tassel Fringe */}
            <polygon points="76,48 81,48 83,56 74,56" fill="#fbbf24" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default WelcomeBanner;

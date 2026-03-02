import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/*  DataJourney – SVG + GSAP automation pipeline visualization        */
/* ------------------------------------------------------------------ */

const GOLD = "#FFD400";
const SILVER = "#8892a0";

export default function DataJourney() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      /* ---- travelling pulse along main path ---- */
      const pulse = svg.querySelector("#pulse-dot");
      const mainPath = svg.querySelector("#main-path");
      if (!pulse || !mainPath) return;

      const pathLen = mainPath.getTotalLength();

      // Set up the dashed "wire" that draws in
      gsap.set(mainPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
      gsap.to(mainPath, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" });

      // Branch paths draw in
      svg.querySelectorAll(".branch-path").forEach((bp) => {
        const len = bp.getTotalLength();
        gsap.set(bp, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(bp, { strokeDashoffset: 0, duration: 1, delay: 1.8, ease: "power2.inOut" });
      });

      // Pulse travel (loops)
      const tl = gsap.timeline({ repeat: -1, delay: 2.2 });
      tl.to(
        { t: 0 },
        {
          t: 1,
          duration: 4,
          ease: "power1.inOut",
          onUpdate: function () {
            const t = this.targets()[0].t;
            const pt = mainPath.getPointAtLength(t * pathLen);
            gsap.set(pulse, { attr: { cx: pt.x, cy: pt.y } });
          },
        }
      );

      // Glow pulse on the dot
      gsap.to(pulse, {
        attr: { r: 8 },
        opacity: 0.6,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ---- Node entrance animations ---- */
      svg.querySelectorAll(".node-group").forEach((node, i) => {
        gsap.from(node, {
          opacity: 0,
          scale: 0.7,
          transformOrigin: "center center",
          duration: 0.6,
          delay: 0.4 + i * 0.5,
          ease: "back.out(1.7)",
        });
      });

      /* ---- Micro-animations on each node ---- */
      // CRM cards fan
      svg.querySelectorAll(".crm-card").forEach((card, i) => {
        gsap.to(card, {
          y: -3 + i * 2,
          x: -2 + i * 3,
          opacity: 1,
          duration: 1.2,
          delay: 1.5 + i * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // AI brain pulse
      const brainCircle = svg.querySelector("#ai-brain-ring");
      if (brainCircle) {
        gsap.to(brainCircle, {
          attr: { r: 22 },
          opacity: 0.2,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Channel icons float
      svg.querySelectorAll(".channel-icon").forEach((icon, i) => {
        gsap.to(icon, {
          y: -4,
          duration: 1 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Phone screen glow
      const phoneGlow = svg.querySelector("#phone-glow");
      if (phoneGlow) {
        gsap.to(phoneGlow, {
          opacity: 0.8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3,
        });
      }

      // Revenue counter tick
      const revText = svg.querySelector("#rev-counter");
      if (revText) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: 6300000,
          duration: 3,
          delay: 3.5,
          repeat: -1,
          repeatDelay: 2,
          ease: "power1.inOut",
          onUpdate: () => {
            revText.textContent = "$" + Math.round(counter.val).toLocaleString();
          },
        });
      }

      // "Launch Campaign" button click animation
      const launchBtn = svg.querySelector("#launch-btn");
      if (launchBtn) {
        gsap.to(launchBtn, {
          scale: 0.95,
          transformOrigin: "center center",
          duration: 0.3,
          repeat: -1,
          repeatDelay: 5,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Cursor click
      const cursor = svg.querySelector("#cursor-hand");
      if (cursor) {
        gsap.to(cursor, {
          y: 2,
          duration: 0.3,
          repeat: -1,
          repeatDelay: 5,
          yoyo: true,
          ease: "power2.inOut",
        });
      }
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 560 620"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="wire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.6" />
            <stop offset="50%" stopColor={GOLD} stopOpacity="1" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.6" />
          </linearGradient>
          <clipPath id="phone-clip">
            <rect x="395" y="420" width="80" height="130" rx="10" />
          </clipPath>
        </defs>

        {/* ============ MAIN CIRCUIT PATH ============ */}
        <path
          id="main-path"
          d="M 120 85 L 120 150 Q 120 170 140 170 L 260 170 Q 280 170 280 190 L 280 260 Q 280 280 300 280 L 380 280 Q 400 280 400 300 L 400 420"
          stroke="url(#wire-grad)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Branch paths from multi-channel node */}
        <path
          className="branch-path"
          d="M 330 310 Q 310 310 310 330 L 310 380"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
        <path
          className="branch-path"
          d="M 400 320 L 400 380"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />
        <path
          className="branch-path"
          d="M 450 310 Q 470 310 470 330 L 470 380"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          filter="url(#glow)"
        />

        {/* ============ TRAVELLING PULSE DOT ============ */}
        <circle id="pulse-dot" cx="120" cy="85" r="5" fill={GOLD} filter="url(#glow-strong)" />

        {/* ============ NODE 0: LAUNCH BUTTON / DASHBOARD ============ */}
        <g className="node-group">
          {/* Mini dashboard frame */}
          <rect x="50" y="20" width="140" height="70" rx="8" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
          {/* Title bar dots */}
          <circle cx="64" cy="32" r="3" fill="#ff5f57" fillOpacity="0.7" />
          <circle cx="74" cy="32" r="3" fill="#ffbd2e" fillOpacity="0.7" />
          <circle cx="84" cy="32" r="3" fill="#28c840" fillOpacity="0.7" />
          {/* Mini sidebar lines */}
          <rect x="56" y="42" width="30" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
          <rect x="56" y="50" width="24" height="3" rx="1.5" fill="white" fillOpacity="0.08" />
          <rect x="56" y="58" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.06" />
          {/* Launch Campaign button */}
          <g id="launch-btn">
            <rect x="100" y="48" width="78" height="24" rx="6" fill={GOLD} fillOpacity="0.9" />
            <text x="139" y="64" textAnchor="middle" fill="#000" fontSize="8" fontWeight="600" fontFamily="system-ui">
              Launch Campaign
            </text>
          </g>
          {/* Cursor */}
          <g id="cursor-hand">
            <path d="M 148 76 L 155 83 L 150 83 L 152 90 L 148 90 L 146 83 L 142 86 Z" fill="white" fillOpacity="0.9" />
          </g>
          {/* Label */}
          <text x="120" y="108" textAnchor="middle" fill={SILVER} fontSize="9" fontFamily="system-ui">
            Backend Trigger
          </text>
        </g>

        {/* ============ NODE 1: CRM ============ */}
        <g className="node-group">
          {/* Glass card */}
          <rect x="210" y="140" width="130" height="65" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
          {/* DB icon */}
          <ellipse cx="235" cy="160" rx="10" ry="5" fill="none" stroke={GOLD} strokeWidth="1.2" />
          <path d="M 225 160 L 225 175 Q 235 182 245 175 L 245 160" fill="none" stroke={GOLD} strokeWidth="1.2" />
          <ellipse cx="235" cy="168" rx="10" ry="3" fill="none" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Mini contact cards */}
          <g className="crm-card" opacity="0.7">
            <rect x="258" y="152" width="50" height="14" rx="3" fill="white" fillOpacity="0.08" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.3" />
            <text x="263" y="162" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.6">J. Smith 92</text>
          </g>
          <g className="crm-card" opacity="0.5">
            <rect x="262" y="170" width="50" height="14" rx="3" fill="white" fillOpacity="0.06" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.2" />
            <text x="267" y="180" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.5">M. Chen 87</text>
          </g>
          <g className="crm-card" opacity="0.3">
            <rect x="266" y="186" width="50" height="14" rx="3" fill="white" fillOpacity="0.04" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.15" />
            <text x="271" y="196" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.4">A. Lopez 78</text>
          </g>
          {/* Label */}
          <text x="275" y="222" textAnchor="middle" fill={SILVER} fontSize="9" fontFamily="system-ui">
            CRM Database
          </text>
        </g>

        {/* ============ NODE 2: AI ENGINE ============ */}
        <g className="node-group">
          <rect x="220" y="242" width="130" height="50" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
          {/* Brain / neural icon */}
          <circle cx="252" cy="267" r="14" fill="none" stroke={GOLD} strokeWidth="1.2" />
          <circle id="ai-brain-ring" cx="252" cy="267" r="18" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
          {/* Neural connections inside */}
          <circle cx="246" cy="262" r="2" fill={GOLD} fillOpacity="0.6" />
          <circle cx="258" cy="262" r="2" fill={GOLD} fillOpacity="0.6" />
          <circle cx="252" cy="274" r="2" fill={GOLD} fillOpacity="0.6" />
          <line x1="246" y1="262" x2="258" y2="262" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="246" y1="262" x2="252" y2="274" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="258" y1="262" x2="252" y2="274" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Labels inside card */}
          <text x="278" y="262" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.5">Segmenting...</text>
          <text x="278" y="275" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.4">Personalizing...</text>
          {/* Label */}
          <text x="285" y="308" textAnchor="middle" fill={SILVER} fontSize="9" fontFamily="system-ui">
            AI Engine
          </text>
        </g>

        {/* ============ NODE 3: MULTI-CHANNEL SPLIT ============ */}
        <g className="node-group">
          {/* Email icon */}
          <g className="channel-icon">
            <rect x="295" y="380" width="28" height="20" rx="4" fill="white" fillOpacity="0.06" stroke={GOLD} strokeWidth="0.8" />
            <path d="M 298 383 L 309 392 L 320 383" fill="none" stroke={GOLD} strokeWidth="0.8" />
            <text x="309" y="415" textAnchor="middle" fill={SILVER} fontSize="7" fontFamily="system-ui">Email</text>
          </g>
          {/* SMS icon */}
          <g className="channel-icon">
            <rect x="386" y="380" width="28" height="22" rx="6" fill="white" fillOpacity="0.06" stroke={GOLD} strokeWidth="0.8" />
            <rect x="392" y="388" width="16" height="3" rx="1.5" fill={GOLD} fillOpacity="0.4" />
            <rect x="392" y="393" width="10" height="3" rx="1.5" fill={GOLD} fillOpacity="0.3" />
            <text x="400" y="415" textAnchor="middle" fill={SILVER} fontSize="7" fontFamily="system-ui">SMS</text>
          </g>
          {/* Chatbot icon */}
          <g className="channel-icon">
            <rect x="456" y="380" width="28" height="20" rx="4" fill="white" fillOpacity="0.06" stroke={GOLD} strokeWidth="0.8" />
            <circle cx="465" cy="390" r="2" fill={GOLD} fillOpacity="0.5" />
            <circle cx="475" cy="390" r="2" fill={GOLD} fillOpacity="0.5" />
            <text x="470" y="415" textAnchor="middle" fill={SILVER} fontSize="7" fontFamily="system-ui">Chatbot</text>
          </g>
          {/* Label */}
          <text x="390" y="360" textAnchor="middle" fill={SILVER} fontSize="9" fontFamily="system-ui">
            Multi-Channel Split
          </text>
        </g>

        {/* ============ NODE 4: CUSTOMER TOUCHPOINT (PHONE) ============ */}
        <g className="node-group">
          {/* Phone body */}
          <rect x="365" y="430" width="70" height="120" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.12" strokeWidth="1.2" />
          {/* Screen */}
          <rect x="372" y="442" width="56" height="90" rx="4" fill={GOLD} fillOpacity="0.05" />
          <rect id="phone-glow" x="372" y="442" width="56" height="90" rx="4" fill={GOLD} fillOpacity="0.1" />
          {/* Notch */}
          <rect x="390" y="434" width="20" height="4" rx="2" fill="white" fillOpacity="0.1" />
          {/* Message bubbles on screen */}
          <rect x="378" y="452" width="38" height="14" rx="5" fill={GOLD} fillOpacity="0.3" />
          <text x="383" y="462" fill="white" fontSize="6" fontFamily="system-ui" fillOpacity="0.7">Hey Sarah! 🎉</text>
          <rect x="392" y="472" width="32" height="14" rx="5" fill="white" fillOpacity="0.1" />
          <text x="397" y="482" fill="white" fontSize="6" fontFamily="system-ui" fillOpacity="0.5">Book now!</text>
          <rect x="378" y="492" width="40" height="14" rx="5" fill="#28c840" fillOpacity="0.3" />
          <text x="383" y="502" fill="white" fontSize="6" fontFamily="system-ui" fillOpacity="0.7">✓ Confirmed</text>
          {/* Home indicator */}
          <rect x="388" y="540" width="24" height="3" rx="1.5" fill="white" fillOpacity="0.15" />
          {/* Label */}
          <text x="400" y="568" textAnchor="middle" fill={SILVER} fontSize="9" fontFamily="system-ui">
            Customer Touchpoint
          </text>
        </g>

        {/* ============ NODE 5: REVENUE COUNTER ============ */}
        <g className="node-group">
          {/* Glass card */}
          <rect x="120" y="470" width="160" height="60" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
          {/* Up arrow icon */}
          <path d="M 145 505 L 155 490 L 165 505" fill="none" stroke="#28c840" strokeWidth="2" />
          <line x1="155" y1="490" x2="155" y2="518" stroke="#28c840" strokeWidth="2" strokeOpacity="0.5" />
          {/* Revenue number */}
          <text id="rev-counter" x="210" y="505" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="system-ui">
            $0
          </text>
          <text x="210" y="520" textAnchor="middle" fill={SILVER} fontSize="8" fontFamily="system-ui">
            Revenue Generated
          </text>
        </g>

        {/* Connecting line to revenue */}
        <path
          className="branch-path"
          d="M 365 500 Q 320 500 280 500 L 280 500"
          stroke={GOLD}
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="4 4"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}

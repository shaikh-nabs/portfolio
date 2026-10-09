// Illustrated "property videos" for the hero phone. Simple shapes only, so they stay crisp at any size.

const svgProps = {
  viewBox: '0 0 250 530',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'kb absolute inset-0 h-full w-full',
  'aria-hidden': true,
}

function Palm({ x, y, h, flip = false, color = '#1E3328' }) {
  const s = flip ? -1 : 1
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M0 0 Q${6 * s} ${-h / 2} ${2 * s} ${-h}`} stroke="#2A1F2C" strokeWidth="4" fill="none" strokeLinecap="round" />
      {[-60, -25, 10, 45, 80, 125].map((a) => (
        <ellipse key={a} cx={2 * s} cy={-h} rx="22" ry="5" fill={color} transform={`rotate(${a} ${2 * s} ${-h}) translate(16 0)`} />
      ))}
    </g>
  )
}

export function VillaScene() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="villa-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B1E4A" />
          <stop offset=".45" stopColor="#B4527A" />
          <stop offset=".72" stopColor="#F4A261" />
        </linearGradient>
        <linearGradient id="villa-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5CC8E0" />
          <stop offset="1" stopColor="#1F6F8B" />
        </linearGradient>
      </defs>
      <rect width="250" height="530" fill="url(#villa-sky)" />
      <circle cx="165" cy="250" r="40" fill="#FFD9A3" opacity=".9" />
      <path d="M0 300 Q60 270 120 292 T250 280 V340 H0z" fill="#5B3A5E" opacity=".55" />
      <rect y="338" width="250" height="192" fill="#1B1426" />
      {/* villa */}
      <rect x="34" y="262" width="162" height="88" fill="#E9D7C2" />
      <rect x="66" y="218" width="98" height="48" fill="#F3E5D4" />
      <rect x="30" y="258" width="170" height="6" fill="#CDB8A0" />
      <rect x="62" y="214" width="106" height="6" fill="#CDB8A0" />
      {[44, 74, 134, 164].map((x) => (
        <rect key={x} x={x} y="282" width="20" height="30" rx="1" fill="#FFC56B" />
      ))}
      {[80, 104, 128].map((x) => (
        <rect key={x} x={x} y="230" width="16" height="22" fill="#FFD48A" />
      ))}
      <rect x="104" y="296" width="22" height="54" fill="#6B4A3A" />
      {/* pool */}
      <rect x="20" y="360" width="210" height="34" rx="3" fill="url(#villa-pool)" />
      {[372, 382].map((y) => (
        <path key={y} d={`M34 ${y} h40 M96 ${y} h56 M170 ${y} h44`} stroke="#BFF1FA" strokeWidth="1.5" opacity=".6" />
      ))}
      <Palm x={22} y={350} h={120} />
      <Palm x={222} y={352} h={105} flip />
      <Palm x={206} y={356} h={70} color="#24402F" />
    </svg>
  )
}

export function SkylineScene() {
  const towers = [
    [8, 300, 34], [44, 250, 30], [76, 330, 26], [148, 270, 32], [182, 310, 28], [212, 240, 36],
  ]
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070B1E" />
          <stop offset=".6" stopColor="#1C2A5C" />
          <stop offset="1" stopColor="#3B3F7E" />
        </linearGradient>
        <pattern id="lit" width="7" height="9" patternUnits="userSpaceOnUse">
          <rect width="7" height="9" fill="#131A36" />
          <rect x="1.5" y="2" width="3" height="4" fill="#FFD27A" opacity=".75" />
        </pattern>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24305E" />
          <stop offset="1" stopColor="#0A0F24" />
        </linearGradient>
      </defs>
      <rect width="250" height="530" fill="url(#sky-night)" />
      {[[30, 60], [90, 40], [150, 90], [210, 50], [60, 140], [190, 150], [120, 30], [230, 110]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#fff" opacity=".8" />
      ))}
      <circle cx="200" cy="178" r="15" fill="#F5F0DC" />
      {towers.map(([x, y, w]) => (
        <rect key={x} x={x} y={y} width={w} height={420 - y} fill="url(#lit)" />
      ))}
      {/* the tall one */}
      <polygon points="112,120 118,120 120,160 124,160 128,420 102,420 106,160 110,160" fill="url(#lit)" />
      <rect x="114" y="70" width="2" height="52" fill="#9AA6D6" />
      <rect y="420" width="250" height="110" fill="url(#water)" />
      {[434, 448, 462].map((y, i) => (
        <path key={y} d={`M${20 + i * 10} ${y} h30 M100 ${y} h${30 - i * 6} M170 ${y} h40`} stroke="#FFD27A" strokeWidth="1.5" opacity={0.5 - i * 0.12} />
      ))}
    </svg>
  )
}

export function InteriorScene() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="int-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2E2A" />
          <stop offset="1" stopColor="#6B5446" />
        </linearGradient>
        <linearGradient id="int-view" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2B279" />
          <stop offset="1" stopColor="#E9846B" />
        </linearGradient>
        <radialGradient id="int-glow">
          <stop offset="0" stopColor="#FFE2A8" stopOpacity=".7" />
          <stop offset="1" stopColor="#FFE2A8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="250" height="530" fill="url(#int-wall)" />
      {/* window with a view */}
      <rect x="24" y="96" width="202" height="230" fill="url(#int-view)" />
      <path d="M24 300 V262 h20 v-30 h16 v40 h18 v-62 h14 v62 h20 v-24 h22 v24 h16 v-48 h12 v48 h20 v-20 h18 v-14 h22 V300z" fill="#8C4A4A" opacity=".55" />
      <rect x="24" y="300" width="202" height="26" fill="#C9705E" opacity=".5" />
      <path d="M24 96 h202 v230 h-202z M91 96 v230 M158 96 v230" stroke="#2A201C" strokeWidth="5" fill="none" />
      {/* floor */}
      <rect y="326" width="250" height="204" fill="#B88B64" />
      <rect y="326" width="250" height="8" fill="#9C7352" />
      {/* lamp */}
      <rect x="124" y="0" width="2" height="130" fill="#1E1714" />
      <path d="M104 152 a21 21 0 0 1 42 0z" fill="#E9C99B" />
      <circle cx="125" cy="170" r="60" fill="url(#int-glow)" />
      {/* sofa */}
      <rect x="30" y="338" width="190" height="56" rx="14" fill="#F3EBDF" />
      <rect x="22" y="358" width="206" height="44" rx="12" fill="#E8DECF" />
      <rect x="48" y="340" width="40" height="26" rx="8" fill="#D9A46C" />
      <rect x="162" y="340" width="40" height="26" rx="8" fill="#8FA88C" />
      {/* table + plant */}
      <ellipse cx="125" cy="440" rx="58" ry="12" fill="#3B2C25" />
      <rect x="121" y="440" width="8" height="34" fill="#3B2C25" />
      <rect x="196" y="396" width="22" height="26" rx="3" fill="#2E2420" />
      {[-40, -15, 10, 35].map((a) => (
        <ellipse key={a} cx="207" cy="384" rx="5" ry="18" fill="#3F6B47" transform={`rotate(${a} 207 396)`} />
      ))}
    </svg>
  )
}

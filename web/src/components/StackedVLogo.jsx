import React from 'react';

function Hex({ cx, cy, r = 3, fill = 'currentColor', stroke = 'none' }) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 6; // flat-top hex
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return <polygon points={points.join(' ')} fill={fill} stroke={stroke} />;
}

export default function StackedVLogo({
  size = 32,
  color = 'currentColor',
  accent = 'var(--primary)',
  showText = true,
  compact = false,
}) {
  const width = Math.round(size * 2.1);
  const height = size;

  const wordmark = (
    <div style={{ fontSize: compact ? 10 : 11, letterSpacing: 2, marginTop: compact ? 0 : 4, color: 'var(--muted)', fontWeight: 700, textAlign: 'center' }}>
      VEHICLE<br />VITALS
    </div>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: compact ? 'row' : 'column', alignItems: compact ? 'center' : 'center', gap: compact ? 8 : 2 }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
  {/* Outer V */}
  <path d="M8 2 L32 30 L56 2" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
  {/* Middle V — slightly inset */}
  <path d="M12 4 L32 27 L52 4" stroke={color} strokeOpacity="0.8" strokeWidth="1.9" strokeLinecap="round" />
  {/* Inner V — more inset and higher clearance to increase spacing */}
  <path d="M20 6.5 L32 22 L44 6.5" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />

        {/* Bolt accents (hex nuts) at endpoints and apex */}
        <Hex cx={8} cy={2} r={3} fill={color} />
        <Hex cx={56} cy={2} r={3} fill={color} />
        <Hex cx={32} cy={30} r={3} fill={accent} />
      </svg>
      {showText && wordmark}
    </div>
  );
}
